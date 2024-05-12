const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');
const {  adminMiddleWare } = require('../middleware/admin');
const { authMiddleWare } = require('../middleware/auth');

// Define routes using controller functions
router.get("/",[authMiddleWare],[adminMiddleWare] ,controller.getUser);  
router.post("/",  controller.postUser);
router.put("/:id" ,controller.putUser);
router.delete("/:id" , controller.deleteUser);
router.post("/login" , controller.login)

module.exports = router;
