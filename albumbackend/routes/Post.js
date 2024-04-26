const express =require('express')
const router = express.Router()

const controller=require("../controllers/PostController");

router.get("/",controller.getPosts);
router.post("/",controller.Post);
router.get("/user/:id",controller.getPostOfUser);
router.put("/:id",controller.putPost);
router.delete("/:id",controller.deleteUser)



module.exports=router;