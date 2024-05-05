const express = require('express');
const router = express.Router();

const controller = require('../controllers/UserController');

// Define routes using controller functions
router.get("/", controller.getUser);
router.post("/", controller.postUser);
router.put("/:id", controller.putUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
