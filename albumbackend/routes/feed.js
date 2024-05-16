const express =require('express')
const router = express.Router()

const controller=require("../controllers/FeedController");
const {  authMiddleWare, restrictTo } = require('../middleware/auth');
router.get("/",authMiddleWare,restrictTo('USER','ADMIN'),controller.getFeed);




module.exports=router;