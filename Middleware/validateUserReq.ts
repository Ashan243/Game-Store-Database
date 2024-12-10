import { Request, Response, NextFunction} from "express"
import Joi from "joi"

//Only add value fields that user is going to put in manually
export const loginSchemaVal = Joi.object({
    email: Joi.string().min(8).max(255).required(),
    password: Joi.string().min(8).max(255).required()
})


//This function excepts a schema
//errors.details[0].message
export const validateSchema = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, { abortEarly: false})
        if(error){
            res.status(400).json({errors: error.details.map((details) => ({
                message: details.message,
                field: details.path.join(".")
            })
        )})
        return 
        }
        next()
    }
}

