import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ username, email, password });

    return res.json(user);
  }
}
