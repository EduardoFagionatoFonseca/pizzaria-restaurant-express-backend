import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const createUserService = new CreateUserService();
      const user = await createUserService.execute({ username, email, password });

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Não foi possível criar sua conta. Verifique os dados informados e tente novamente.",
      });
    }
  }
}
