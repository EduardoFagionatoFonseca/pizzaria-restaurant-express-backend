import prismaClient from "../../prisma";

interface DeleteItemServiceProps {
  item_id: string;
}

export class DeleteItemService {
  async execute({ item_id }: DeleteItemServiceProps) {
    const itemExists = await prismaClient.item.findUnique({
      where: {
        id: item_id,
      },
      select: {
        id: true,
      },
    });

    if (!itemExists) {
      throw new Error("Item not found");
    }

    await prismaClient.item.delete({
      where: {
        id: item_id,
      },
    });

    return { message: "Item successfully deleted" };
  }
}
