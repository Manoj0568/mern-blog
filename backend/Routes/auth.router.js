import {Router} from 'express'
import { authController, signinController } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post("/signup",authController)
authRouter.post("/signin",signinController)

export default authRouter