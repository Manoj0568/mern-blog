import {Router} from 'express'
import { deleteUser, getUser, getUsers, signoutUser, updateUser, userController } from '../controllers/user.controller.js'
import { verifyuser } from '../utils/verifyuser.js'

const userRouter = Router()

userRouter.put("/update/:id",verifyuser,updateUser)
userRouter.delete("/delete/:id",verifyuser,deleteUser)
userRouter.post('/signout',signoutUser)
userRouter.get("/getusers",verifyuser,getUsers)
userRouter.get('/:userId',getUser)
export default userRouter