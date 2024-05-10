const express=require('express')
const router = express.Router()


const controller =require("../controllers/AlbumController")
const { authMiddleWare } = require('../middleware/auth')

// router.get("/",[authMiddleWare] ,controller.getAlbum)
router.get("/:id",[authMiddleWare],controller.getAlbumById)
router.get("/",[authMiddleWare],controller.getAlbumOfUser)
router.post("/",[authMiddleWare],controller.postAlbum)
router.put("/:id",[authMiddleWare],controller.putAlbum)
router.delete("/:id",[authMiddleWare],controller.deleteAlbum)


module.exports=router;