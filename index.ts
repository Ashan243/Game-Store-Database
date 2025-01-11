import { globalErrorHandler } from "./Middleware/globalErrorHandler"
import userRoutes from "./Routes/userRoutes"
import staffRoutes from "./Routes/staffRoutes"
import { ConnectDB } from "./Utils/dbconnection" 
import express from "express"


/**
 * 
 * 
 * @copyright By Ashan Griffith Mundle, github www.github.com/Ashan243
 * @description Game Store API for handling gaming services
 */
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(globalErrorHandler) //This middleware will be executed for any and every endpoint




app.use("/api/user", userRoutes)
app.use("/api/staff", staffRoutes)


const PORT = process.env.PORT || 4002

ConnectDB(process.env.MONGO_URI ?? "mongodb://localhost:27017").then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`))).catch(err => console.log(err))
