import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Product name is required" }),
    price: z
      .string()
      .min(1, { message: "Product price is required" })
      .regex(/^\d+$/), //verifica numero inteiro,
    description: z
      .string()
      .min(1, { message: "Product description is required" }),
    category_id: z.string().min(1, { message: "Product category is required" }),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    disabled: z.string().optional().default("false"),
  }),
});

export const listProductByCategorySchema = z.object({
  query: z.object({
    category_id: z.string(),
  }),
});
