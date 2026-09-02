import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authService = new AuthUserService();
      const session = await authService.execute({ email, password });

      return res.json(session);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Falha ao realizar o login. Verifique seu e-mail e senha.",
      });
    }
  }
}
