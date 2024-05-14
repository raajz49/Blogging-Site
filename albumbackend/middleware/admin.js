const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret');

const prisma = new PrismaClient();




const adminMiddleWare = async (req, res, next) => {
    try {
        const user = req.user;
        if (user && user.role === "ADMIN") {
            next();
        } else {
            res.json({ status: false, message: "Unauthorized access of admin" });
        }
    } catch (error) {
        console.error("Error in adminMiddleWare:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports = { adminMiddleWare };
