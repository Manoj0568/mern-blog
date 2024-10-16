import { errorHandler } from "./error.js"
import { validateToken } from "./token.js"
import jwt from 'jsonwebtoken'

export const verifyuser = async (req,res,next)=>{
     console.log("working finehere")
      const token = req.cookies.authToken
      jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            next(errorHandler(403,"unauthorized token"))
        }else{
            console.log(user)
            req.user = user
            next()
        }
      })

}