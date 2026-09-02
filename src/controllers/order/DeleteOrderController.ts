import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id } = req.params;
      if (!order_id || typeof order_id !== "string") {
        throw new Error("Order id must be a string");
      }

      const deleteOrder = new DeleteOrderService();
      const order = await deleteOrder.execute({ order_id });
      return res.status(204).json(order);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível cancelar o pedido. Tente novamente.",
      });
    }
  }
}
