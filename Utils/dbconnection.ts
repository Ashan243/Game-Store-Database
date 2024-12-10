import mongoose from "mongoose"



export const ConnectDB = async(mongoDb: string) =>{
    try {
        const conn = await mongoose.connect(mongoDb)
        if(!conn){
            console.log("Could not connect to database")
        }
    } catch (error) {
        console.error(error)
    }
}