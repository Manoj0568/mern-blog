import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
export const authController = async(req,res,next)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password || username=="" || email =="" || password == ""){
        next(errorHandler(400,"feilds can't be empty"))
    }
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser =await new User({username,email,password:hashedPassword})
    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
}