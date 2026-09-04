import { Request, Response } from "express";
import { ListUsersService } from "../../services/user/ListUsersService";

export class ListUsersController {
  async handle(_req: Request, res: Response) {
    try {
      const users = await new ListUsersService().execute();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Unable to load users. Please try again.",
      });
    }
  }
}
