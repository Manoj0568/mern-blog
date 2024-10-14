import { Router } from "express";
import { verifyuser } from "../utils/verifyuser.js";
import { createComment, editComment, getPostComments, likeComment } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter.post('/create',verifyuser,createComment)
commentRouter.put('/likeComment/:commentId', verifyuser, likeComment);
commentRouter.put('/editComment/:commentId', verifyuser, editComment);
commentRouter.get('/getPostComments/:postId',getPostComments)
export default commentRouter