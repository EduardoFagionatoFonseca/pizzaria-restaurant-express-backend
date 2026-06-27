import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

export class DetailOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.params;

    if (typeof order_id !== "string") {
      throw new Error("order_id must be a string!");
    }

    const detailOrder = new DetailOrderService();
    const order = await detailOrder.execute({ order_id });

    return res.status(200).json(order);
  }
}
