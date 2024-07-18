import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { StockExchangeConfirmationStatus } from "~/utils/enums";
import { TRPCError } from "@trpc/server";

export const stockRouter = createTRPCRouter({
  adminGetStockSettingList: adminProcedure.query(async ({ ctx }) => {
    const stockSettingList = await ctx.prisma.stockSetting.findMany();
    const stockExchangeQuantitySum = await ctx.prisma.stockExchange.groupBy({
      where: {
        NOT: {
          status: StockExchangeConfirmationStatus.REJECTED,
        },
      },
      by: ["stockSettingId"],
      _sum: {
        quantity: true,
      },
    });

    const stockSettingListWithSum = stockSettingList.map((stockSetting) => {
      const stockExchangeSum = stockExchangeQuantitySum.find(
        (stockExchange) => stockExchange.stockSettingId === stockSetting.id
      );
      return {
        ...stockSetting,
        stockExchangeSum: stockExchangeSum?._sum.quantity ?? 0,
      };
    });

    return stockSettingListWithSum;
  }),

  adminGetStockSettingById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.stockSetting.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  adminCreateStockSetting: adminProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string().optional(),
        maxStock: z.number(),
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.stockSetting.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description ?? "",
          maxStock: input.maxStock,
          code: input.code,
        },
      });
    }),

  adminUpdateStockSettingById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        description: z.string().optional(),
        maxStock: z.number().optional(),
        code: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.stockSetting.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          price: input.price,
          description: input.description,
          maxStock: input.maxStock,
          code: input.code,
        },
      });
    }),

  adminDeleteStockSettingById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.stockSetting.delete({
        where: {
          id: input.id,
        },
      });
    }),

  adminCreateStockExchange: adminProcedure
    .input(
      z.object({
        stockSettingId: z.string(),
        quantity: z.number(),
        imageUrl: z.string().optional(),
        buyerEmail: z.string().optional(),
        buyerName: z.string().optional(),
        buyerPhone: z.string().optional(),
        buyerAddress: z.string().optional(),
        customPrice: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      /* Admin can create stock exchange for other users
       * Buyer email is required to create stock exchange for other users
       * Buyer email is optional to create stock exchange for self
       * If user with buyer email is not found, create new user with buyer email
       * If buyer email is null, use buyer name as buyer name, set email to placeholder
       */
      const session = ctx.session;
      if (!session) {
        throw new Error("Unauthorized");
      }

      const mostRecentStockExchange = await ctx.prisma.stockExchange.findFirst({
        where: {
          stockSettingId: input.stockSettingId,
        },
        orderBy: {
          code: "desc",
        },
      });

      const stockSetting = await ctx.prisma.stockSetting.findUnique({
        where: {
          id: input.stockSettingId,
        },
      });

      if (!stockSetting) {
        throw new Error("Kode saham tidak ditemukan");
      }

      // Case : Remaining Stock is not enough
      const stockExchangeAggr = await ctx.prisma.stockExchange.aggregate({
        where: {
          stockSettingId: input.stockSettingId,
          status: { not: StockExchangeConfirmationStatus.REJECTED },
        },
        _sum: {
          quantity: true,
        },
      });

      const {
        _sum: { quantity: stockExchangeQuantitySum },
      } = stockExchangeAggr;

      console.log(stockExchangeAggr);
      if (
        (stockExchangeQuantitySum ?? 0) + input.quantity >
        stockSetting.maxStock
      ) {
        throw new Error("Jumlah saham yang tersedia tidak mencukupi");
      }

      // Case : Buyer Email Filled
      if (input.buyerEmail) {
        let buyerUser = await ctx.prisma.user.findUnique({
          where: {
            email: input.buyerEmail,
          },
        });
        if (!buyerUser) {
          buyerUser = await ctx.prisma.user.create({
            data: {
              email: input.buyerEmail,
              name: input.buyerName ?? "",
              phoneNumber: input.buyerPhone ?? "",
              address: input.buyerAddress ?? "",
              isActivated: false,
            },
          });
        }

        if (!buyerUser) {
          throw new Error("Terjadi kesalahan saat membuat user");
        }

        return await ctx.prisma.stockExchange.create({
          data: {
            buyerId: buyerUser.id,
            stockSettingId: input.stockSettingId,
            quantity: input.quantity,
            price: input.customPrice ?? stockSetting.price,
            buyerName: input.buyerName ?? "",
            status: StockExchangeConfirmationStatus.PENDING,
            timeOccured: new Date(),
            imageUrl: input.imageUrl,
            code: mostRecentStockExchange
              ? mostRecentStockExchange.code + mostRecentStockExchange.quantity
              : 1,
          },
        });
      }

      // Case : Buyer email null, buyer name filled
      if (!input.buyerName) {
        throw new Error(
          "Nama pembeli tidak boleh kosong jika email pembeli kosong"
        );
      }

      const buyerUser = await ctx.prisma.user.create({
        data: {
          email: "placeholder",
          name: input.buyerName,
          phoneNumber: input.buyerPhone ?? "",
          address: input.buyerAddress ?? "",
          isActivated: false,
        },
      });

      if (!buyerUser) {
        throw new Error("Terjadi kesalahan saat membuat user");
      }

      return await ctx.prisma.stockExchange.create({
        data: {
          buyerId: buyerUser.id,
          stockSettingId: input.stockSettingId,
          quantity: input.quantity,
          price: input.customPrice ?? stockSetting.price,
          buyerName: input.buyerName,
          status: StockExchangeConfirmationStatus.PENDING,
          timeOccured: new Date(),
          imageUrl: input.imageUrl,
          code: mostRecentStockExchange
            ? mostRecentStockExchange.code + mostRecentStockExchange.quantity
            : 1,
        },
      });
    }),

  adminGetStockExchangeList: adminProcedure
    .input(
      z.object({
        buyerName: z.string().optional(),
        page: z.number(),
        pageSize: z.number(),
        status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.stockExchange.findMany({
        where: {
          buyerName: {
            contains: input.buyerName,
          },
          status: input.status,
        },
        skip: (input.page - 1) * input.pageSize,
        take: input.pageSize,
        include: {
          StockSetting: true,
        },
      });

      const newRes = res.map((stockExchange) => {
        return {
          ...stockExchange,
          lastCode: stockExchange.code + stockExchange.quantity - 1,
        };
      });

      const count = await ctx.prisma.stockExchange.count({
        where: {
          buyerName: {
            contains: input.buyerName,
          },
          status: input.status,
        },
      });

      return {
        data: newRes,
        metadata: {
          count,
        },
      };
    }),
  adminGetStockExchangeById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.stockExchange.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  adminUpdateStockExchangeById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.number().optional(),
        quantity: z.number().optional(),
        status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.stockExchange.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
          price: input.price,
          quantity: input.quantity,
          imageUrl: input.imageUrl,
        },
      });
    }),
  adminDeleteStocExchangekById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.stockExchange.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getStockSettingList: publicProcedure.query(async ({ ctx }) => {
    const stockSettingList = await ctx.prisma.stockSetting.findMany({});
    const stockExchangeQuantitySum = await ctx.prisma.stockExchange.groupBy({
      where: {
        NOT: {
          status: StockExchangeConfirmationStatus.REJECTED,
        },
      },
      by: ["stockSettingId"],
      _sum: {
        quantity: true,
      },
    });
    const returnedStockSettingList = stockSettingList.map((stockSetting) => {
      const stockExchangeSum = stockExchangeQuantitySum.find(
        (stockExchange) => stockExchange.stockSettingId === stockSetting.id
      );
      return {
        ...stockSetting,
        stockExchangeSum: stockExchangeSum?._sum.quantity ?? 0,
      };
    });
    return returnedStockSettingList;
  }),
  getStockSettingByCode: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      const StockSetting = await ctx.prisma.stockSetting.findUnique({
        where: {
          code: input.code,
        },
        include: {
          Product: true,
        },
      });

      if (!StockSetting) {
        throw new Error("Saham Tidak Ditemukan");
      }

      return StockSetting;
    }),
  getUserStockExchangeList: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    if (!session) {
      throw new Error("Unauthorized");
    }
    const list = await ctx.prisma.stockExchange.findMany({
      where: {
        buyerId: session.user.id,
      },
    });

    const res = list.map((stockExchange) => {
      return {
        ...stockExchange,
        lastCode: stockExchange.code + stockExchange.quantity - 1,
      };
    });

    return res;
  }),
  createStockExchange: publicProcedure
    .input(
      z.object({
        stockSettingId: z.string(),
        quantity: z.number(),
        imageUrl: z.string().optional(),
        buyerName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      if (!session) {
        throw new Error("Unauthorized");
      }

      const mostRecentStockExchange = await ctx.prisma.stockExchange.findFirst({
        where: {
          stockSettingId: input.stockSettingId,
        },
        orderBy: {
          code: "desc",
        },
      });

      const stockSetting = await ctx.prisma.stockSetting.findUnique({
        where: {
          id: input.stockSettingId,
        },
      });

      if (!stockSetting) {
        throw new Error("Kode saham tidak ditemukan");
      }

      // Case : Remaining Stock is not enough
      const stockExchangeAggr = await ctx.prisma.stockExchange.aggregate({
        where: {
          stockSettingId: input.stockSettingId,
          status: { not: StockExchangeConfirmationStatus.REJECTED },
        },
        _sum: {
          quantity: true,
        },
      });

      const {
        _sum: { quantity: stockExchangeQuantitySum },
      } = stockExchangeAggr;

      if (
        (stockExchangeQuantitySum ?? 0) + input.quantity >
        stockSetting.maxStock
      ) {
        throw new Error("Jumlah saham yang tersedia tidak mencukupi");
      }

      return await ctx.prisma.stockExchange.create({
        data: {
          buyerId: session.user.id,
          stockSettingId: input.stockSettingId,
          quantity: input.quantity,
          price: stockSetting.price,
          buyerName:
            input.buyerName === "" ? input.buyerName : session.user.name ?? "",
          status: StockExchangeConfirmationStatus.PENDING,
          timeOccured: new Date(),
          imageUrl: input.imageUrl,
          code: mostRecentStockExchange
            ? mostRecentStockExchange.code + mostRecentStockExchange.quantity
            : 1,
        },
      });
    }),
  updateStockExchange: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        imageUrl: z.string().optional(),
        buyerName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      if (!session) {
        throw new Error("Unauthorized");
      }

      const userId = session.user.id;
      const stock = await ctx.prisma.stockExchange.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!stock) {
        throw new Error("Stock not found");
      }
      if (stock.buyerId !== userId) {
        throw new Error("Unauthorized");
      }

      // Case quantity is not enough
      if (input.quantity && stock.stockSettingId) {
        const stockSetting = await ctx.prisma.stockSetting.findUnique({
          where: {
            id: stock.stockSettingId,
          },
        });

        if (!stockSetting) {
          throw new Error("Stock setting not found");
        }

        const stockExchangeAggr = await ctx.prisma.stockExchange.aggregate({
          where: {
            stockSettingId: stock.stockSettingId,
            status: { not: StockExchangeConfirmationStatus.REJECTED },
          },
          _sum: {
            quantity: true,
          },
        });

        const {
          _sum: { quantity: stockExchangeQuantitySum },
        } = stockExchangeAggr;

        if (
          (stockExchangeQuantitySum ?? 0) - stock.quantity + input.quantity >
          stockSetting.maxStock
        ) {
          throw new Error("Jumlah saham yang tersedia tidakmencukupi");
        }
      }

      return await ctx.prisma.stockExchange.update({
        where: {
          id: input.id,
        },
        data: {
          quantity: input.quantity,
          price: input.price,
          imageUrl: input.imageUrl,
          buyerName: input.buyerName,
        },
      });
    }),
  getStockExchangeList: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.prisma.stockExchange.findMany({
      select: {
        StockSetting: {
          select: {
            name: true,
            code: true,
          },
        },
        buyerName: true,
        quantity: true,
      },
      orderBy: {
        quantity: "desc",
      },
      take: 10,
    });

    return res;
  }),
});
