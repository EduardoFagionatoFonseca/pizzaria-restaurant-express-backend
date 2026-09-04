import prismaClient from "../../prisma";
interface promoteUserProps {
  // requesterId: string;
  role: "ADMIN" | "STAFF";
  userId: string;
}

export class PromoteUserService {
  async execute({ userId, role }: promoteUserProps) {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    return updatedUser;
  }
}
