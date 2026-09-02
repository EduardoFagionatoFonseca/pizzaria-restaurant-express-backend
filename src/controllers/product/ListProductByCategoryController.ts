import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductByCategoryService";

export class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const category_id = req.query.category_id as string;

      const ListService = new ListProductsByCategoryService();

      const products = await ListService.execute({ category_id });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível carregar os produtos desta categoria.",
      });
    }
  }
}
