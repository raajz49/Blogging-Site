const express=require('express')
const router = express.Router()


const controller =require("../controllers/AuthController")

router.post("/signup", controller.signup)
router.post("/login",controller.login)
router.post("/delete/:id",controller.authdelete)

// router.post("/",controller.postAlbum)


module.exports=router;