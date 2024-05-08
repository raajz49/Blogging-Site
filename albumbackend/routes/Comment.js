const express =require('express')
const router = express.Router()

const controller=require("../controllers/CommentController");

router.get('/',controller.getComments)
router.post('/:id',controller.postComments)
router.get('/posts/:id',controller.getCommentofPost)
router.get('/:postId/:commentId', controller.getCommentById);
router.delete('/:id', controller.deleteComments);



module.exports=router;