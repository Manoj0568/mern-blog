import jwt from 'jsonwebtoken'
export const generateToken = (signId,secretKey,exp)=>{
    const token = jwt.sign({id:signId},secretKey,{expiresIn: 1000 * 60 * exp})
    return token
}

export const validateToken = (token,secretKey)=>{
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return false
        }else{
            return user
        }
    })
}