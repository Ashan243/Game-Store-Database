
import { Router} from "express";
import { createUser, getUserByEmail, updateUser, deleteUser } from "../Controllers/userController";
import { loginSchemaVal, validateSchema } from "../Middleware/validateUserReq";


const router = Router()
router.post("/register", [validateSchema(loginSchemaVal), ], createUser) 
router.get("finduser", getUserByEmail)
router.put("/updateuser", updateUser)
router.delete("/deleteuser", deleteUser)


export default router