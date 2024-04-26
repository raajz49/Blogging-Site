const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

module.exports={

    
    get:async(req,res)=>{
        const allUsers = await prisma.user.findMany();
        res.json(allUsers)
    },

    post:async(req,res)=>{
    
        const newUser = await prisma.user.create({data:req.body});
        res.json(newUser)
    },

    put:async(req,res)=>{
        const id=req.params.id;
        const newfirstName=req.body.firstName
        const newlastName=req.body.lastName
        const newAge = req.body.age;
        const updatedUser = await prisma.user.update({
            where: {id:parseInt(id)},
            data:{age:newAge,firstName:newfirstName,lastName:newlastName}
        });
        res.json(updatedUser)
    },

    delete:async(req,res)=>{
        const id=req.params.id;
        const deletedUser = await prisma.user.delete({
            where: {id:parseInt(id)},
        });
        res.json(deletedUser)
    }
}