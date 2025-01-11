import { number } from "joi";
import mongoose, {Document} from "mongoose";





export interface Item extends Document{

    itemId: number
    name: string 
    price: number
    category: string
}



export const itemSchema = new mongoose.Schema<item>({

    itemId:{
        type: Number,
        required: true,
        unique: true
    },

    name:{ 
        type: String,
        required: true,
        },

    price:{ 
        type: Number,
        required: true},
    
    category:{ 
        type: String,
        unique: true}

}, {timestamps: true, virtuals: true})



export const itemModel = mongoose.model<item>("itemModel", itemSchema )