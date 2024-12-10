import { Request, Response, NextFunction} from "express";
import { StaffServices } from "../Services/staffServices";
import { generateToken, verifyToken } from "../Services/tokenServices";
import _ from "lodash";





export const createStaff = async(req:Request, res:Response, next:NextFunction) =>{
    const staff = await StaffServices.createStaff(req.body)

    const accessToken = generateToken(req.body.email ,process.env.ACCESS_TOKEN_SECRET!, "15m")
    const refreshToken = generateToken(req.body.email ,process.env.REFRESH_TOKEN_SECRET!, "7d")

    try {
        res.cookie("refreshToken", refreshToken, {
            //NODE_ENV is the built information about the node environment you working 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //Secure means that cookies are sent to server only over a https connection
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days in milliseconds - 604,800,000 msec
            sameSite: true
        })
    
        const pickedStaff = _.pick(staff, ["email", "role"])
        res.status(201).json({success: true, data: {
            info: pickedStaff,
            token: accessToken
        }})
    
    } catch (error) {
        next(error)
    }
}


export const findStaff = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const staff = await StaffServices.findStaff(req.body)//{id: 8wy9sdfhisdfisdf}
        res.status(200).json({success: true, data: staff
        })
        
    } catch (error) {
        next(error)
    }
}


export const updateStaffDetails = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const staff = await StaffServices.updateStaffDetails(req.body)
        res.status(200).json({success: true, data: staff})
    } catch (error) {
        next(error)
    }
}



export const deleteStaff = async(req:Request, res:Response, next:NextFunction) =>{

     try {
        await StaffServices.deleteStaff(req.body)
        res.status(200).json({success: true, message: "Staff Member Deleted"})
     } catch (error) {
        next(error)
     }
}