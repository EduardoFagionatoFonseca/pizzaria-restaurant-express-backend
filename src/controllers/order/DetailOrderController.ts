import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

export class DetailOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { order_id } = req.params;

      if (typeof order_id !== "string") {
        throw new Error("order_id must be a string!");
      }

      const detailOrder = new DetailOrderService();
      const order = await detailOrder.execute({ order_id });

      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível carregar os detalhes do pedido.",
      });
    }
  }
}
