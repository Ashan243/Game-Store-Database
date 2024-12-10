import jwt from "jsonwebtoken"
import { userModel } from "../Models/userModel"



export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret)
}
//{id: this_id}
export const generateToken = (payload: object, secret: string,  expiresIn: string) => {
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}


// export const refreshToken = ()
