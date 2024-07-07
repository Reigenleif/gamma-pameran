import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const productRouter = createTRPCRouter({
    getAllProducts: publicProcedure.query(({ ctx }) => {
        const productList = ctx.prisma.product.findMany();
        return ctx.prisma.product.findMany();
    }),
    getProductById: publicProcedure.input(z.object({
        id: z.string()
    })).query(({ ctx, input }) => {
        return ctx.prisma.product.findUnique({
            where: {
                id: input.id
            }
        })
    }),
    createProduct: publicProcedure.input(z.object({
        name: z.string(),
        price: z.number(),
        imageUrl: z.string(),
        description: z.string(),
        maxStock: z.number(),
        categoryId: z.string(),
        displayCoordinateX: z.number(),
        displayCoordinateY: z.number(),
        floatCoordinateX: z.number(),
        floatCoordinateY: z.number()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.create({
            data: input
        })
    }),
    updateProduct: publicProcedure.input(z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        price: z.number().optional(),
        imageUrl: z.string().optional(),
        description: z.string().optional(),
        maxStock: z.number().optional(),
        categoryId: z.string().optional(),
        displayCoordinateX: z.number().optional(),
        displayCoordinateY: z.number().optional(),
        floatCoordinateX: z.number().optional(),
        floatCoordinateY: z.number().optional()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.update({
            where: {
                id: input.id
            },
            data: input
        })
    }),
    deleteProduct: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.product.delete({
            where: {
                id: input.id
            }
        })
    }),
    createOrder: publicProcedure.input(z.object({
        userId: z.string(),
        productId: z.string(),
        quantity: z.number()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.order.create({
            data: {
                userId: input.userId,
                productId: input.productId,
            }
        })
    }),
    getOrdersByUserId: publicProcedure.input(z.object({
        userId: z.string()
    })).query(({ ctx, input }) => {
        return ctx.prisma.order.findMany({
            where: {
                userId: input.userId
            }
        })
    }),
    getOrdersByProductId: publicProcedure.input(z.object({
        productId: z.string()
    })).query(({ ctx, input }) => {
        return ctx.prisma.order.findMany({
            where: {
                productId: input.productId
            }
        })
    }),
    deleteOrder: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(({ ctx, input }) => {
        return ctx.prisma.order.delete({
            where: {
                id: input.id
            }
        })
    }),

})