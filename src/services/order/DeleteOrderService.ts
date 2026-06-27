import prismaClient from "../../prisma";
interface DeleteOrderProps {
  order_id: string;
}

export class DeleteOrderService {
  async execute({ order_id }: DeleteOrderProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });
      if (!orderExists) {
        throw new Error("Order not found");
      }

      await prismaClient.order.delete({
        where: {
          id: order_id,
        },
      });

      return { message: "order deleted sucessfully" };
    } catch (err) {
      console.log(err);
      throw new Error("unable to delete order");
    }
  }
}
