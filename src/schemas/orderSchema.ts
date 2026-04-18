import { z } from "zod";

export const orderSchema = z.object({
  body: z.object({
    id: z.string(),
    table: z.number(),
    draft: z.boolean(),
    status: z.boolean(),
    name: z.string(),
  }),
});
