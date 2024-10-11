import express from 'express'
import connectToMongoDB from './DB/connectToMongoDB.js';
import dotenv from 'dotenv'
const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000;

app.get("/",(req,res,next)=>{
    res.status(200).json({message:"running successful"})
})

app.listen(PORT,(res,err)=>{
    connectToMongoDB()
    console.log(`server running in http://localhost:${PORT}`)
})