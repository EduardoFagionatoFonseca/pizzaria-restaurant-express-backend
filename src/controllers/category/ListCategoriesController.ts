import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService";

export class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    try {
      const listCategoriesService = new ListCategoriesService();
      const categories = await listCategoriesService.execute();

      return res.json(categories);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível carregar as categorias. Tente novamente.",
      });
    }
  }
}
