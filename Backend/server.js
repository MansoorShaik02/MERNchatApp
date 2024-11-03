import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import authRoutes from './Routes/auth.routes.js'
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/user.routes.js'
import cors from 'cors';
import { app, server } from '../Backend/socket/socket.js'
const PORT = process.env.PORT || 5000


const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend domain, adjust if different
    credentials: true, // Allow credentials such as cookies and authorization headers
};
app.use(cors(corsOptions));
dotenv.config()

app.use(express.json()) // to parse the incoming requests from req.body in json format
app.use(cookieParser())
app.use("/api/messages", messageRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
// app.get("/", (req, res) => {
//     res.send("Hello world yahoo")
// })


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port33333 ${PORT}`)
});