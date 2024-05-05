const express=require('express')
const router = express.Router()


const controller =require("../controllers/AuthController")

router.post("/signup", controller.signup)
// router.post("/",controller.postAlbum)


module.exports=router;