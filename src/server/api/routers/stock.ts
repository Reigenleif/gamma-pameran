import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { StockExchangeConfirmationStatus } from "~/utils/enums";

export const stockRouter = createTRPCRouter({
    adminGetStockExchangeList: adminProcedure.input(z.object({
        buyerName: z.string().optional(),
        page: z.number(),
        pageSize: z.number()
    })).query(({ ctx, input }) => {
        return ctx.prisma.stockExchange.findMany({
            where: {
                buyerName: {
                    contains: input.buyerName
                }
            },
            skip: (input.page - 1) * input.pageSize,
            take: input.pageSize
        })
    }),
    adminGetStockExchangeById: adminProcedure.input(z.object({
        id: z.string()
    })).query(({ ctx, input }) => {
        return ctx.prisma.stockExchange.findUnique({
            where: {
                id: input.id
            }
        })
    }),
    adminUpdateStockExchangeById: adminProcedure.input(z.object({
        id: z.string(),
        price: z.number(),
        quantity: z.number(),
        status: z.enum(["PENDING", "ACCEPTED", "REJECTED"])
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.stockExchange.update({
            where: {
                id: input.id
            },
            data: {
                status: input.status,
                price: input.price,
                quantity: input.quantity
            }
        })
    }),
    adminDeleteStocExchangekById: adminProcedure.input(z.object({
        id: z.string()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.stockExchange.delete({
            where: {
                id: input.id
            }
        })
    }),
    getUserStockExchangeList: publicProcedure.query(({ ctx }) => {
        const session = ctx.session;
        if (!session) {
            throw new Error("Unauthorized")
        }
        return ctx.prisma.stockExchange.findMany({
            where: {
                buyerId: session.user.id
            }
        })
    }),
    createStockExchange: publicProcedure.input(z.object({
        stockSettingId: z.string(),
        quantity: z.number(),
        price: z.number(),
        imageUrl: z.string().optional(),
    })).mutation(({ ctx, input }) => {
        const session = ctx.session;
        if (!session) {
            throw new Error("Unauthorized")
        }

        return ctx.prisma.stockExchange.create({
            data: {
                buyerId: session.user.id,
                stockSettingId: input.stockSettingId,
                quantity: input.quantity,
                price: input.price,
                buyerName: session.user.name ?? "",
                status: StockExchangeConfirmationStatus.PENDING,
                timeOccured: new Date()
            }
        })
    }),
    updateStockExchange: publicProcedure.input(z.object({
        id: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
    })).mutation(async ({ ctx, input }) => {
        const session = ctx.session;
        if (!session) {
            throw new Error("Unauthorized")
        }

        const userId = session.user.id;
        const stock = await ctx.prisma.stockExchange.findUnique({
            where: {
                id: input.id
            },
        })

        if (!stock) {
            throw new Error("Stock not found")
        } 
        if (stock.buyerId !== userId) {
            throw new Error("Unauthorized")
        }

        return ctx.prisma.stockExchange.update({
            where: {
                id: input.id
            },
            data: {
                quantity: input.quantity,
                price: input.price,
            }
        })

    }),
})