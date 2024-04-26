const express=require('express')
const router = express.Router()


const controller =require("../controllers/AlbumController")

router.get("/", controller.getAlbum)
router.post("/",controller.postAlbum)


module.exports=router;