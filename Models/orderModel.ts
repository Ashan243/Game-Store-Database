
import mongoose, {Document} from "mongoose";


export enum paymentMethod{
    CREDIT = "credit",
    PAYPAL = "paypal",
    DEBIT = "debit"

}



export interface Order extends Document{

    orderId: number
    items: string
    paymentMethod: paymentMethod
    doorNo: number
    streetName: string
    postCode: string
}




const orderSchema = new mongoose.Schema<Order>({

    orderId:{
        type: Number,
        required: true,
        unique: true
    },

    items:{
        type: String,
        required: true
    },

    paymentMethod:{
        type: String,
        required: true
    },

    doorNo:{
        type: Number,
        required: true
    },

    streetName:{
        type: String,
        required: true
    },

    postCode:{
        type: String,
        required: true
    }

}, {virtuals: true, timestamps: true})


export const oderModel = mongoose.model<Order>("gameorder", orderSchema)