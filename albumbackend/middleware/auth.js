
const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret');

const prisma = new PrismaClient();

const authMiddleWare = async (req, res, next) => {
  // Extract the token
  const token = req.headers.authorization;

  // If token is not present, throw an error
  if (!token) {
    res.json({ status: false, message: "Unauthorized access1" });
    return;
  }
  
  try {
    // If token is present, verify the token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET);

    // Get the user from the payload
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      return res.json({ status: false, message: "Unauthorized access2" });
    }

    // Check if the user is an admin or the authorized user
    if (user.role === 'ADMIN' || user.id === payload.userId) {
      req.user = user;
      next();
    } else {
      return res.json({ status: false, message: "Unauthorized access3" });
    }
  } catch (error) {
    return res.json({ status: false, message: "Unauthorized access4" });
  }
};

module.exports = { authMiddleWare };
