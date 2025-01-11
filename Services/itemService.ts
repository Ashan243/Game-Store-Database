import { Item, itemModel } from "../Models/itemModel"
import bycrypt from "bcrypt"

type itemDetails = Partial<Item>
type itemDetailsInterface = Pick<itemDetails, "itemId" | "name" | "price" | "category" >

export class ItemService{

    static async findItem(itemData:itemDetailsInterface){}

}