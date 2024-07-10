import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { StockExchangeConfirmationStatus } from "~/utils/enums";

export const stockRouter = createTRPCRouter({
  adminGetStockSettingList: adminProcedure.query(async ({ ctx }) => {
    const stockSettingList = await ctx.prisma.stockSetting.findMany();
    const stockExchangeQuantitySum = await ctx.prisma.stockExchange.groupBy({
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
      return await ctx.prisma.stockExchange.findMany({
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
    return await ctx.prisma.stockSetting.findMany();
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
    return await ctx.prisma.stockExchange.findMany({
      where: {
        buyerId: session.user.id,
      },
    });
  }),
  createStockExchange: publicProcedure
    .input(
      z.object({
        stockSettingId: z.string(),
        quantity: z.number(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      if (!session) {
        throw new Error("Unauthorized");
      }

      const stockSetting = await ctx.prisma.stockSetting.findUnique({
        where: {
          id: input.stockSettingId,
        },
      });

      if (!stockSetting) {
        throw new Error("Kode saham tidak ditemukan");
      }

      return await ctx.prisma.stockExchange.create({
        data: {
          buyerId: session.user.id,
          stockSettingId: input.stockSettingId,
          quantity: input.quantity,
          price: stockSetting.price,
          buyerName: session.user.name ?? "",
          status: StockExchangeConfirmationStatus.PENDING,
          timeOccured: new Date(),
        },
      });
    }),
  updateStockExchange: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
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

      return await ctx.prisma.stockExchange.update({
        where: {
          id: input.id,
        },
        data: {
          quantity: input.quantity,
          price: input.price,
        },
      });
    }),
});
