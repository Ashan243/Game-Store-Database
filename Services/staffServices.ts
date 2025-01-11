import { string } from "joi";
import { staffModel, Staff } from "../Models/staffModel";
import bycrypt from "bcrypt"
 

type staffAuth = Partial<Staff>
type staffAuthInterface = Pick<staffAuth, "email" | "password" | "role"> & {updated?: string}




export class StaffServices{


    static async createStaff(staffData:staffAuth){
        const hashedPassword = await bycrypt.hash(staffData.password!, 15)
        const staff = new staffModel({...staffData, password: hashedPassword})
        staff.save()
        return staff //Here return the sign up data e.g {id, email, role etc...}
    }

    //get request using an unique identifier to find a staff member
    static async findStaff(identifier: {key: "id" | "username", value: string}){
        try {
        
            const staff = await staffModel.findOne( identifier.key === "id" ? {id: identifier.value} : {username: identifier.value}).exec()
            if(!staff){
                throw new Error("Could not find staff member")
            }

            return staff
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }
    }

  
    static async updateStaffDetails(staffData:staffAuthInterface){
        try {
            const staff = await staffModel.findOneAndUpdate({email: staffData.email}, {email: staffData.updated}, {new: true, runValidators: true}).exec()
            if(!staff){
                throw new Error("Could not updated details")
            }
        } catch (error) {
            throw new Error( error instanceof Error ? error.message : "Database Error(500)")
        }
    }


    static async deleteStaff(staffData:staffAuth){
        try {
            const staff = await staffModel.findOneAndDelete({email: staffData.email}).exec()
            if(!staff){
                throw new Error(`Could not delete ${staffData.email}`)
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Error Database Error (500)")
        }
    }
}