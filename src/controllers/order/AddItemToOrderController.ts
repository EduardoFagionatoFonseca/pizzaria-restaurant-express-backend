import { Request, Response } from "express";
import { AddItemToOrderService } from "../../services/order/AddItemToOrderService";

export class AddItemToOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { product_id, amount } = req.body;
      const { order_id } = req.params;
      if (typeof order_id !== "string") {
        throw new Error("order_id must be a string!");
      }
      const addItem = new AddItemToOrderService();
      const newItem = await addItem.execute({
        order_id,
        product_id,
        amount,
      });

      return res.status(201).json(newItem);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível adicionar o item ao pedido. Verifique os dados e tente novamente.",
      });
    }
  }
}
