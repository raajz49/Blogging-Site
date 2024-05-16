const express =require('express')
const router = express.Router()

const controller=require("../controllers/PostController");
const {  authMiddleWare, restrictTo } = require('../middleware/auth');
const { adminMiddleWare } = require('../middleware/admin');

router.get("/user",authMiddleWare,restrictTo('USER','ADMIN'),controller.getPostOfUser);
router.get("/",[authMiddleWare],[adminMiddleWare],controller.getPosts);
router.get("/",authMiddleWare,restrictTo('USER','ADMIN'),controller.getFeed);
router.get("/:id",[authMiddleWare],controller.getPostById);
router.post("/",[authMiddleWare],controller.Post);
router.put("/:id",[authMiddleWare],controller.putPost);
router.delete("/:id",[authMiddleWare],controller.deletePost)




module.exports=router;