const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');
const {  adminMiddleWare } = require('../middleware/admin');
const { authMiddleWare, restrictTo } = require('../middleware/auth');

// Define routes using controller functions
router.get("/",authMiddleWare,restrictTo('ADMIN'),controller.getUser);  
router.get("/:id",authMiddleWare,controller.getUserbyId);
router.post("/",  controller.postUser);
router.put("/:id" ,controller.putUser);
router.delete("/:id" , controller.deleteUser);
router.post("/login" , controller.login)

module.exports = router;
