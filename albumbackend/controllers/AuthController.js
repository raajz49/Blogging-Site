
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


const hashSync = bcrypt.hashSync;
const compareSync=bcrypt.compareSync;
const jwt = require('jsonwebtoken');
const JWT_SECRET= require('../secret')
// console.log(JWT_SECRET)


const signup =async (req, res) => {
    // res.status(500).json({ status: false, message: "Hello" });

    const{email,password,name}=req.body;

    let user=await prisma.user.findFirst({where:{email}})
    if (user){
        res.status(500).json({ status: false, message: "User Already exist" });
    }
    const newUser = await prisma.user.create({ data: req.body });
    res.json(newUser);
    
};

 const login = async (req,res) => {
    const { email, password } = req.body;

    
        let user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            res.status(500).json({ status: false, message: "User doesn't exist" });
        }
        if (!compareSync(password, user.password)) {
            res.status(500).json({ status: false, message: "Incorrect Password" });
        }
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET);

        res.json({ user, token });
    }; 

   const authdelete=async(req,res)=>{
        try {
            const { id } = req.params;
            const deletedUser = await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            res.json(deletedUser);
        } catch (error) {
            console.error('Error in deleting user:', error);
            res.status(500).json({ success: false, message: "Error in deleting user" });
        }
    };
    


module.exports = {
    signup,
    login,
    authdelete
};
