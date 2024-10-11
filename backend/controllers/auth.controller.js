import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import { generateToken } from "../utils/token.js"

export const authController = async(req,res,next)=>{
    console.log("this is")
    const {username,email,password} = req.body
    if(!username || !email || !password || username=="" || email =="" || password == ""){
       return next(errorHandler(400,"feilds can't be empty"))
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

export const signinController = async (req,res,next)=>{
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const {email,password} = req.body
    console.log(email,password)
    if(!email || !password || email =="" || password ==""){
        return next(errorHandler(400,"feilds cannot be emptyy"))
    }
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return next(errorHandler(402,"Credentials not matching"))
        }else{
            let confirmPassword = await bcryptjs.compareSync(password,existingUser?.password)
            
            if(confirmPassword){
                const accessToken = generateToken(existingUser._id,JWT_SECRET_KEY,5)
                // const refreshToken = generateToken(existingUser._id,JWT_SECRET_KEY,30)

                res.cookie('authToken',accessToken,{
                    expires: new Date(Date.now()+ 1000 * 60 * 5),
                    httpOnly: true,
                    sameSite: 'Lax',
                    secure: process.env.NODE_ENV == 'production'
                })
                const userWithoutPassword = existingUser.toObject();
                delete userWithoutPassword.password;
                 console.log(userWithoutPassword)
                res.status(200).json(userWithoutPassword)
            }else{
                return next(errorHandler(402,"Credentials not matching"))
            }
        }
    } catch (error) {
        return next(error)
    }
}