
import { Router } from "express";
import { createStaff, findStaff, updateStaffDetails, deleteStaff } from "../Controllers/staffController";



const router = Router()

router.post("/createstaff", createStaff)
router.get("findstaff", findStaff)
router.put("updatestaffdetails", updateStaffDetails)
router.delete("deletestaff", deleteStaff)


export default router