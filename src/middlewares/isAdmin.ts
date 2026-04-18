import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma/index";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user_id = req.user_id;

  if (!user_id) {
    return res.status(401).json({
      error: "User without permission",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "User without permission",
    });
  }

  if (user.role !== "ADMIN") {
    return res.status(401).json({
      error: "User without permission",
    });
  }

  //if user is admin, continue
  next();
};
