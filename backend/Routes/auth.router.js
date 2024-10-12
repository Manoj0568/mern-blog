import {Router} from 'express'
import { authController, signinController, googleAuthController } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post("/signup",authController)
authRouter.post("/signin",signinController)
authRouter.post("/google",googleAuthController)

export default authRouter