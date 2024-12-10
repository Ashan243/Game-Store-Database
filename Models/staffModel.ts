
import mongoose, {Document} from "mongoose"
import jwt from "jsonwebtoken"
import { MongoBatchReExecutionError } from "mongodb"
import cuid from "cuid"
export interface Staff extends Document{

    id: string
    email: string
    password: string
    role: string
    isStaffMember: boolean
    

}

export enum staffRole{
    STAFF = "staff",
    MANAGER = "manager"
}


const validateStaffEmail = (email:string): boolean =>{
    const regex = RegExp("/^[^s@]+@[^s@]+.(?gamerparadice-manager.com$)[^s@]")
    return regex.test(email)
}



const staffSchema = new mongoose.Schema<Staff>({

    id:{
        type: String,
        required: true,
        default: cuid(),
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: validateStaffEmail
        }
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum: staffRole,
        required: true,
        default: staffRole.STAFF
    },

    isStaffMember:{
        type: Boolean,
        required: true
    }
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}})


staffSchema.pre("save", function(next){
    //The regex test give us a boolean value
    if(validateStaffEmail(this.email)){
        this.role = staffRole.MANAGER
    }
    next()

})

staffSchema.methods.createToken = function(){
    const token = jwt.sign({_id: this._id}, "privatekey")
    return token
}



export const staffModel = mongoose.model<Staff>("gamestaff", staffSchema)