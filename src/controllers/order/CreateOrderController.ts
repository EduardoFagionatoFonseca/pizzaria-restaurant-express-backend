import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { table, name } = req.body;

      const createOrder = new CreateOrderService();
      const order = await createOrder.execute({ table: Number(table), name });

      return res.status(201).json(order);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível abrir o pedido. Verifique os dados da mesa e tente novamente.",
      });
    }
  }
}
