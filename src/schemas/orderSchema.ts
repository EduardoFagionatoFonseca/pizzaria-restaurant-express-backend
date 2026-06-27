import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O numero da mesa e obrigatorio" })
      .int({ message: "O numero da mesa deve ser um inteiro" })
      .positive({ message: "O numero da mesa deve ser maior que zero" }),
    name: z
      .string({ message: "O nome do cliente e obrigatorio" })
      .min(1, { message: "O nome do cliente e obrigatorio" }),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    product_id: z.uuid().min(1),
    amount: z.number().int().positive(),
  }),
  params: z.object({
    order_id: z.uuid().min(1),
  }),
});
