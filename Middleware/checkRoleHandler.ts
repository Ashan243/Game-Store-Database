import { Response, Request, NextFunction } from "express";
import { User, userModel, UserRoles } from "../Models/userModel";


//Middleware modifies the request object or process
export const roleHandler = async function(req: Request & {user: User}, res: Response, next: NextFunction){
    const user = req.user.role

    if(!user){
        res.status(401).json({error: "Unauthorized: You are not logged in"})
    }
    if(user === UserRoles.GUEST){
        return res.status(403).json({error: "Forbidden: You do not have the required access rights to carry this action"})
    }
//When dealing with middleware our focus is on the request body or params (req.body, req.params)
next()
}