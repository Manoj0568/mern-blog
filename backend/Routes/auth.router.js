import {Router} from 'express'
import { authController, signinController, googleAuthController, verifyControll } from '../controllers/auth.controller.js'
import { verifyuser } from '../utils/verifyuser.js'

const authRouter = Router()

authRouter.post("/signup",authController)
authRouter.post("/signin",signinController)
authRouter.post("/google",googleAuthController)
authRouter.get('/get',verifyuser,verifyControll)

export default authRouter