import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

const stockRouter = createTRPCRouter({
    adminGetAllStocks: adminProcedure.input(z.object({
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
    adminGetStockById: adminProcedure.input(z.object({
        id: z.string()
    })).query(({ ctx, input }) => {
        return ctx.prisma.stockExchange.findUnique({
            where: {
                id: input.id
            }
        })
    }),
    adminUpdateStockById: adminProcedure.input(z.object({
        stockId: z.string(),
        price: z.number(),
        quantity: z.number(),
        status: z.enum(["PENDING", "CONFIRMED", "REJECTED"])
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.stockExchange.update({
            where: {
                id: input.stockId
            },
            data: {
                status: input.status
                price: input.price,
                quantity: input.quantity
            }
        })
    }),
    createStock: publicProcedure.input(z.object({
        stockId: z.string(),
        quantity: z.number(),
        price: z.number(),
    })).mutation(({ ctx, input }) => {
        const session = ctx.session;
        if (!session) {
            throw new Error("Unauthorized")
        }

    }),
    updateStock: publicProcedure.input(z.object({
        id: z.string().optional(),
        productId: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        status: z.string().optional()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.stock.update({
            where: {
                id: input.id
            },
            data: input
        })
    }),
    deleteStock: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.stock.delete({
            where: {
                id: input.id
            }
        })
    })
})