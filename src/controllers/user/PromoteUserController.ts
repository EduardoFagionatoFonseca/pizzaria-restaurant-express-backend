import { Request, Response } from "express";
import { PromoteUserService } from "../../services/user/PromoteUserService";

export class PromoteUserController {
  async handle(req: Request, res: Response) {
    console.log("workingm");
    const { role } = req.body;
    const userId = req.params.userId as string;
    const requesterId = req.user_id;
    if (requesterId === userId) {
      return res
        .status(404)
        .json({ error: "You cannot change your own permission" });
    }

    const promoteUserService = new PromoteUserService();
    const promotedUser = await promoteUserService.execute({
      userId,
      role,
    });

    return res.status(201).json(promotedUser);
  }
}
