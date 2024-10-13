import {Router} from 'express'
import { deleteUser, updateUser, userController } from '../controllers/user.controller.js'
import { verifyuser } from '../utils/verifyuser.js'

const userRouter = Router()

userRouter.put("/update/:id",verifyuser,updateUser)
userRouter.delete("/delete/:id",verifyuser,deleteUser)

export default userRouter