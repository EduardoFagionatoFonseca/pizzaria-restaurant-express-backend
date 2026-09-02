import prismaClient from "../../prisma";
interface promoteUserProps {
  // requesterId: string;
  userId: string;
}

export class PromoteUserService {
  async execute({ userId }: promoteUserProps) {
    // const userIsAdmin = await prismaClient.user.findFirst({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!userIsAdmin) {
    //   throw new Error("Voce deve ser admin para acessar essa rota!");
    // }
    // not checking here because we have a middleware to check for admin permissions

    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "ADMIN",
      },
    });

    return updatedUser;
  }
}
