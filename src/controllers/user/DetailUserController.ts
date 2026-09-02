import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailsUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.user_id;

      const detailService = new DetailUserService();
      const userData = await detailService.execute(user_id);

      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Não foi possível carregar os dados do usuário.",
      });
    }
  }
}
