const express =require('express')
const router = express.Router()

const controller=require("../controllers/PhotoController")

router.get("/",controller.getphoto)
router.get("/albums/:id",controller.getphotoofalbum)
router.post("/",controller.postPhoto);

module.exports=router;