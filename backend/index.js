import express from 'express'
import connectToMongoDB from './DB/connectToMongoDB.js';
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './Routes/user.router.js';
import authRouter from './Routes/auth.router.js';
import cookieParser from 'cookie-parser'
import postRouter from './Routes/post.router.js';
import commentRouter from './Routes/comment.router.js';
const app = express()
dotenv.config()
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PUT",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
const PORT = process.env.PORT || 4000;

app.use("/api/user",userRouter)
app.use("/api/auth", authRouter)

app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


app.listen(PORT,(res,err)=>{
    connectToMongoDB()
    console.log(`server running in http://localhost:${PORT}`)
})