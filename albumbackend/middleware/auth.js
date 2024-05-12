
const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secret');

const prisma = new PrismaClient();


const authMiddleWare = async (req ,res, next) => {
  
 
  //extract the token
  const token = req.headers.authorization

  //if token is not present throw error
  if (!token) {
     res.json({status:false,message:"Unauthorized access1"})
     return 
  }
  try {
    //if token is present, verify the token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) ;

    // get the user from the payload
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      return res.json({status:false,message:"Unauthorized access2"})
    }

    // to attach the user to the current request object
    if (user.role==='ADMIN' || user.id ===payload.userId){
    req.user = user;
    next();
    }else{
      return res.json({status:false,message:"unauthorzed access3"})
    }
  } catch (error) {
    return res.json({status:false,message:"Unauthorized access3"})
  }
}

module.exports = { authMiddleWare}
