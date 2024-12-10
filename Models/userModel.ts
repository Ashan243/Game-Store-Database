import jwt from "jsonwebtoken"
import mongoose, {Document} from "mongoose"


export enum UserRoles {
    GUEST = "guest",
    USER = "user",
    PRO_USER = "pro_user",
    
}

export interface User extends Document{

    id: number
    email: string
    password: string
    role: UserRoles
    isGuest: boolean
    createRefreshToken(): () => void
}



const validateEmail = (email:string): boolean =>{
    const regex = RegExp("/^[^s@]+@[^s@]+.(?gamerparadice.com$)[^s@]")
    return regex.test(email)
}


export const userSchema = new mongoose.Schema<User>({

    id:{
        type: Number,
        required: true
    },

    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate:{
            validator: validateEmail
        }
    },

    password:{
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: [true, "User role is required"],
        default: UserRoles.GUEST
    },
    isGuest:{
        //GUEST, USER, PRO_USER, VIP_USER
        type: Boolean,
        required: true

    }
}, {virtuals: true, timestamps: true})


//Save logic goes in here
userSchema.pre("save", function(next){
    this.isGuest === validateEmail(this.email)
    this.role !== UserRoles.GUEST ? this.isGuest = false : this.isGuest = true
})



//Virtual functions and methods are seperate
//pre they seperate based on the first arguement - which is the action



userSchema.methods.createToken = function(){
    const token = jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: "15m"})
    return token
}

//These also go in the services 
userSchema.methods.createRefreshToken = function(){
    const refreshToken = jwt.sign({id: this._id},  process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "7d"})
    return refreshToken
}
//You can use typpescript static methods to add the method to class and not the instance
// userSchema.statics.createRefreshToken2 = function(){
//     const refreshToken = jwt.sign({id: this._id},  process.env.REFRESH_TOKEN_SECRET!, {expiresIn: "7d"})
//     return refreshToken
// }
export const userModel = mongoose.model<User>("gameuser", userSchema)