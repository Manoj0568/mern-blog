import { Router } from "express";
import { verifyuser } from "../utils/verifyuser.js";
import { create, getPosts } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.post('/create',verifyuser,create)
postRouter.get('/getposts',getPosts)
export default postRouter