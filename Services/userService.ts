import { userModel, User } from "../Models/userModel";
import bycrypt from "bcrypt"

type userAuth = Partial<User>
type userAuthInterface = Pick<userAuth, "email" | "password"> & {updated?: string}

export class UserService{


    static async createUser(userData:userAuth){

        const hashpassword = await bycrypt.hash(userData.password!, 15)
        const user = new userModel({...userData, password: hashpassword})
        user.save()
        return user
    }

    static async getUserByEmail(userData:userAuth){

        try {
            const user = await userModel.findOne({email: userData.email}).exec()
            if(!user){
                throw new Error(`Could not find and delete the user with the email ${userData.email}`)
            }
        } catch (error) {
            throw new Error(error instanceof Error? error.message : "Database Error (500)"
            )
        }
    }

    static async updateUser(userData:userAuthInterface){
        try {
            const user = await userModel.findOneAndUpdate({email: userData.email}, {email: userData.updated}, {new: true, runValidators: true}).exec()
            if(!user){
                throw new Error("Could not update user")
            }
            user.save()
            return user

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }
    }

    static async deleteUser(userData:userAuthInterface){
        
       try {
        const user = await userModel.findOneAndDelete({email: userData.email}).exec()
        if(!user){
            throw new Error("Unable to delete user")
         }
       } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error (500)")
       
        }
    }




}

