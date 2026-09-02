import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/finishOrderService";

export class FinishOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      if (!order_id || typeof order_id !== "string") {
        throw new Error("Order id must be a string");
      }

      const finishOrder = new FinishOrderService();
      const updatedOrder = await finishOrder.execute({ order_id });
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível finalizar o pedido. Tente novamente.",
      });
    }
  }
}
