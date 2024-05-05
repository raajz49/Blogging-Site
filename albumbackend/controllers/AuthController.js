
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const hashSync = bcrypt.hashSync;


const signup =async (req, res) => {
    // res.status(500).json({ status: false, message: "Hello" });

    const{email,password,name}=req.body;

    let user=await prisma.user.findFirst({where:{email}})
    if (user){
        throw Error("user already exist")
    }
    user = await prisma.user.create({
    
            data: { age: newAge, 
                firstName: newFirstName,
                 lastName: newLastName,
                  email: newEmail,
                   address: newAddress, 
                   id: newId }
    })
    res.json(user)
};



module.exports = {
    signup
};
