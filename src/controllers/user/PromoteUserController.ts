import { Request, Response } from "express";
import { PromoteUserService } from "../../services/user/PromoteUserService";

export class PromoteUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.body;

    const promoteUserService = new PromoteUserService();
    const promotedUser = await promoteUserService.execute({
      userId,
    });

    return res.status(201).json(promotedUser);
  }
}
