const express =require('express')
const router = express.Router()

const controller=require("../controllers/PhotoController")

router.get("/",controller.getphoto)
router.get("/albums/:id",controller.getphotoofalbum)
router.get('/:photoId', controller.getPhotoById);
router.post("/:id",controller.postPhoto);
router.delete("/:id",controller.deletePhoto)

module.exports=router;