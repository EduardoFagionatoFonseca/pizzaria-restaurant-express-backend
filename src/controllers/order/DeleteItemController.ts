import { Request, Response } from "express";
import { DeleteItemService } from "../../services/order/DeleteItemService";

export class DeleteItemController {
  async handle(req: Request, res: Response) {
    const { item_Id } = req.params;

    if (typeof item_Id !== "string") {
      throw new Error("item_Id must be a string!");
    }

    const deleteItem = new DeleteItemService();
    const result = await deleteItem.execute({ item_id: item_Id });

    return res.status(200).json(result);
  }
}
