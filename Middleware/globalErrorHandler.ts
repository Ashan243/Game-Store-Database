import { Request, Response, NextFunction} from "express"

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    try {
        const error = req.body
        if(!error){
        res.status(500).json({success: false, message: "Server Error"})
    }

    } catch (error) {
        next(error)
    }
}