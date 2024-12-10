import { Request, Response, NextFunction} from "express"
import {UserService} from "../Services/userService"
import { verifyToken, generateToken } from "../Services/tokenServices"
import _ from "lodash"


export const createUser = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const user = await UserService.createUser(req.body)
        //Create JWT token and refresh Token

        //genereate the accesstoken
        const accessToken = generateToken(req.body.username, process.env.ACCESS_TOKEN_SECRET!, "15m" );
        //generates refreshToken 
        const refreshToken = generateToken(req.body.username, process.env.REFRESH_TOKEN_SECRET!, "7d")

        //We must store the refresh tokens in http only cookie storage
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, //This prevents our refresh token from being exposed to be access via javascript
            secure: process.env.NODE_ENV === "production",  //Set our HTTPS security to be true
            maxAge: 7 * 24 * 60 * 60 * 1000, //liseconds by default, 7 days , 24 hours, 60 min, 60 seconds, 1000 milliseconds = 1 second
            sameSite: "strict" //prevents CSRF - Cross Resource Sharing
        })

       const pickedUser = _.pick(user, ["email", "role"])
        res.status(201).json({success: true, data:{
            info: pickedUser
            //DO NOT SEND THE REFRESH TOKEN AS RESPONSE VIA the json object area
        }})
    } catch (error) {
        next()
    }
}


export const getUserByEmail = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const user = await UserService.getUserByEmail(req.body)
        res.status(200).json({success: true, data: user})
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req:Request, res:Response, next:NextFunction) =>{

    const user = await UserService.updateUser(req.body)
    res.status(200).json({success: true, data: {...user}, message: "User details successfully updated"})
}


export const deleteUser = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const user = await UserService.deleteUser(req.body)
        res.status(200).json({success: true, message: "User deleted"})
    } catch (error) {
        next(error)
    }
}
