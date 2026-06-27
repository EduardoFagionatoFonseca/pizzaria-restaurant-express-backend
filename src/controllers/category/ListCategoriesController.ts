import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService";

export class ListCategoriesController {
  async handle(_req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService();
    const categories = await listCategoriesService.execute();

    return res.json(categories);
  }
}
