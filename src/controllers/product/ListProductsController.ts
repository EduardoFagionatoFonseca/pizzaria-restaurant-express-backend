import { Request, Response } from "express";
import { ListProductsService } from "../../services/product/ListProductsService";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    try {
      const disabled = req.query.disabled as string | undefined;
      const listProductsService = new ListProductsService();
      const products = await listProductsService.execute({
        disabled: disabled,
      });

      return res.json(products);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível carregar os produtos. Tente novamente.",
      });
    }
  }
}
