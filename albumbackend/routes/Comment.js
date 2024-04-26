const express =require('express')
const router = express.Router()

const controller=require("../controllers/CommentController");

router.get('/',controller.getComments)
router.post('/',controller.postComments)
router.get('/posts/:id',controller.getCommentofUser)



module.exports=router;