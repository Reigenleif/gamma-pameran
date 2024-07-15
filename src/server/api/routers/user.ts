import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import bcrypt from "bcryptjs";
import { isValidPhoneNumber } from "~/utils/function/isValidPhoneNumber";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
        address: z.string(),
        phoneNumber: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Kasih reCHAPTCHA
      const { email, password, name, address, phoneNumber } = input;
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");
      if (!name) throw new Error("Name is required");
      if (!address) throw new Error("Address is required");
      if (!isValidPhoneNumber(phoneNumber ?? "0"))
        throw new Error("Phone number is invalid");

      const hashPassword = await bcrypt.hash(password, 12);

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser?.isActivated) throw new Error("Email telah terdaftar");
      if (existingUser) {
        const newUser = await prisma.user.update({
          where: {
            email,
          },
          data: {
            hashPassword,
            name,
            address,
            phoneNumber,
            isActivated: true,
          },
        });

        return newUser;
      }

      const existingUserWithName = await prisma.user.findFirst({
        where: {
          name,
          isActivated: false,
        },
      });

      if (existingUserWithName) {
        const newUser = await prisma.user.update({
          where: {
            id: existingUserWithName.id,
          },
          data: {
            email,
            hashPassword,
            address,
            phoneNumber,
            isActivated: true,
          },
        });

        return newUser;
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          hashPassword,
          name,
          address,
          phoneNumber,
        },
      });

      return newUser;
    }),
});
