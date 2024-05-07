const express =require('express')
const router = express.Router()

const controller=require("../controllers/PostController");
const {  authMiddleWare } = require('../middleware/auth');

router.get("/",[authMiddleWare],controller.getPostOfUser);
router.get("/:id",[authMiddleWare],controller.getPostById);
router.post("/",[authMiddleWare],controller.Post);
// router.get("/user",[authMiddleWare],controller.getPostOfUser);
router.put("/:id",[authMiddleWare],controller.putPost);
router.delete("/:id",[authMiddleWare],controller.deletePost)




module.exports=router;