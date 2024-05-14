const express=require('express')
const router = express.Router()


const controller =require("../controllers/AlbumController")
const { authMiddleWare } = require('../middleware/auth')
const { adminMiddleWare } = require('../middleware/admin')

router.get("/user",authMiddleWare,controller.getAlbumOfUser)
router.get("/",[authMiddleWare],[adminMiddleWare],controller.getAlbum)
router.get("/:id",[authMiddleWare],controller.getAlbumById)
router.post("/",[authMiddleWare],controller.postAlbum)
router.put("/:id",[authMiddleWare],controller.putAlbum)
router.delete("/:id",[authMiddleWare],controller.deleteAlbum)


module.exports=router;