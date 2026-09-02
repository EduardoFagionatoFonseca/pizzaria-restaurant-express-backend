import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

export class ListOrdersController {
  async handle(req: Request, res: Response) {
    try {
      const draft = req.query?.draft as string | undefined;
      const listOrders = new ListOrdersService();
      const orders = await listOrders.execute({ draft: draft });
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível carregar os pedidos. Tente novamente.",
      });
    }
  }
}
