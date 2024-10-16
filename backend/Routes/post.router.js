import { Router } from "express";
import { verifyuser } from "../utils/verifyuser.js";
import { create, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";

const postRouter = Router()

postRouter.post('/create',verifyuser,create)
postRouter.get('/getposts',getPosts)
postRouter.put('/updatepost/:postid/:userid',verifyuser,updatePost)
postRouter.delete('/delete/:postId/:userid',verifyuser,deletePost)
export default postRouter