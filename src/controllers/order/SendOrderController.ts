import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/sendOrderService";

export class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.params;
    if (!order_id || typeof order_id !== "string") {
      throw new Error("Order id must be a string");
    }
    const name = req.body?.name;

    const sendOrder = new SendOrderService();
    const order = await sendOrder.execute({ name: name, order_id });
    return res.status(200).json(order);
  }
}
