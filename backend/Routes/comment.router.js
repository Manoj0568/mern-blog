import { Router } from "express";
import { verifyuser } from "../utils/verifyuser.js";
import { createComment, deleteComment, editComment, getComments, getPostComments, likeComment } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter.post('/create',verifyuser,createComment)
commentRouter.put('/likeComment/:commentId', verifyuser, likeComment);
commentRouter.put('/editComment/:commentId', verifyuser, editComment);
commentRouter.get('/getPostComments/:postId',getPostComments)
commentRouter.delete('/deleteComment/:commentId',verifyuser,deleteComment)
commentRouter.get('/getcomments',verifyuser,getComments)
export default commentRouter