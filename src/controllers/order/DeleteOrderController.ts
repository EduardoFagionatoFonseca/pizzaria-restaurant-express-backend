import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

export class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.params;
    if (!order_id || typeof order_id !== "string") {
      throw new Error("Order id must be a string");
    }

    const deleteOrder = new DeleteOrderService();
    const order = await deleteOrder.execute({ order_id });
    return res.status(204).json(order);
  }
}
