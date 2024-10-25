import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoutes from './Routes/auth.routes.js'
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'
const PORT = process.env.PORT || 5000
const app = express();
dotenv.config()
app.use(express.json()) // to parse the incoming requests from req.body in json format
app.use(cookieParser())
app.use("/api/messages", messageRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
// app.get("/", (req, res) => {
//     res.send("Hello world yahoo")
// })


app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server running on port ${PORT}`)
});