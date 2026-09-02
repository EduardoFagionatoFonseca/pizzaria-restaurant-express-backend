import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, { message: "username needs to be at least 3 digits long" }),
    email: z.email({ message: "Needs to be a valid  email" }),
    password: z
      .string()
      .min(6, { message: "password needs to have at least 6 digits." }),
  }),
});

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: "Needs to be a vaild email" }),
    password: z
      .string({ message: "password is required" })
      .min(1, { message: "password is required" }),
  }),
});

export const promoteUserSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});
