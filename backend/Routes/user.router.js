import {Router} from 'express'
import { updateUser, userController } from '../controllers/user.controller.js'
import { verifyuser } from '../utils/verifyuser.js'

const userRouter = Router()

userRouter.put("/update/:id",verifyuser,updateUser)

export default userRouter