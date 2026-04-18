import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailsUserService";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const detailService = new DetailUserService();
    const userData = await detailService.execute(user_id);

    res.json(userData);
  }
}
