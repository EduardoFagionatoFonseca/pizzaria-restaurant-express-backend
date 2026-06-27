import prismaClient from "../../prisma";

interface ItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddItemToOrderService {
  async execute({ amount, order_id, product_id }: ItemProps) {
    try {
      if (amount < 1) {
        throw new Error("amount must be bigger than 1");
      }
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });
      if (!orderExists) {
        throw new Error("Order not found");
      }

      const productExists = await prismaClient.product.findFirst({
        where: {
          id: product_id,
          disabled: false,
        },
      });

      if (!productExists) {
        throw new Error("product not found");
      }

      const item = await prismaClient.item.create({
        data: {
          order_id: order_id,
          product_id: product_id,
          amount: amount,
          total: productExists.price * amount,
        },
        select: {
          id: true,
          amount: true,
          order_id: true,
          product_id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to add item to order");
    }
  }
}
