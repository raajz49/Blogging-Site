const express =require('express')
const router = express.Router()

const controller = require('../controllers/UserController');
router.get("/",controller.getUser);
router.post("/",controller.postUser);
router.put("/:id",controller.PutUser);
router.delete("/:id",controller.deleteUser);
module.exports= router;