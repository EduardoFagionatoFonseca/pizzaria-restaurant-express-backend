import prismaClient from "../../prisma";

interface SendOrderProps {
  name: string;
  order_id: string;
}

export class SendOrderService {
  async execute({ name, order_id }: SendOrderProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.draft === false) {
        throw new Error("this order has already been sent");
      }

      const updateOrder = prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      });

      return updateOrder;
    } catch (error) {
      console.log(error);
      throw new Error("unable to send order");
    }
  }
}
