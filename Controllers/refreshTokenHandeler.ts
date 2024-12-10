
import {Request, Response} from "express"
import { userSchema } from "../Models/userModel"
import jwt from "jsonwebtoken"
import { generateToken } from "../Services/tokenServices"


//Why is this in the controller? 
//1. Because firstly there is no database operations to be done
//2. Not in the model because it hasn't got anything to with the schema or schema methods yet

export const refreshTokenHandler = (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken


    //if we do not a refresh token we raise an exception of 401
    if(!refreshToken){
        return res.status(401).json({error: "No refresh token was provided"})
    }

    try {
        //If there is a valid refresh token then the we can generate a new access token for the user
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
        const newAccessToken = generateToken(
            {username: (user as any).username},
            process.env.ACCESS_TOKEN_SECRET!,
            "15m"
        )
        res.json({accessToken: newAccessToken})
    } catch (error) {
        return res.status(403).json({error: "Invalid or expired refresh token"})
    }
}



