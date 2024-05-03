
const bcrypt=require('bcrypt')
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


        //function to find a user
        async function findUserByEmail(email){
            try {
                return await prisma.user.findUnique({
                    where:{
                        email,
                    },
                });
            } catch (error) {
                throw new error("Error finding user by email")
            }
        }


            //function to create user using hashed password
            async function createUserByEmailandPassword(user){
                try{
                    const hashedPassword=await bcrypt.hash(user.password,12);
                    return await prisma.user.create({
                        data:{
                            ...user,
                            password:hashedPassword,
                        }
                    })
                } catch(error){
                    throw new Error("Error in creating user");
                }
            }

            //function to create user by id
            async function findUserById(id){
                try{
                    return await prisma.user.findUnique({
                        where:{
                            id,
                        }
                    })
                }catch(error){
                    throw new error("Error finding user by id");
                }
            }
                
            
            //function to get all the users
        async function getAllUser (){
        try {
            const allUsers = await prisma.user.findMany();
        res.json(allUsers)

        } catch (error) {
            res.json({success:false,message:"Error in fetching User"})
        }
        
    }

    // const postUser=async(req,res)=>{

    //     try {
    //         const newUser= await prisma.user.create({
    //             data:req.body
    //         });
    //         res.json(newUser)

    //     } catch (error) {
    //         res.json({success:false,message:"Error in Posting User"})
    //     }
      
    // }

//    const PutUser = async(req,res)=>{

//     try {
//         const id=req.params.id;
//         const newfirstName=req.body.firstName
//         const newlastName=req.body.lastName
//         const newAge = req.body.age;
//         const newAddress=req.body.address
//         const newEmail=req.body.email
//         const newid=req.body.id
//         const updatedUser = await prisma.user.update({
//             where: {id:parseInt(id)},
//             data:{age:newAge,firstName:newfirstName,lastName:newlastName,email:newEmail,address:newAddress ,id:newid}
//         });
//         res.json(updatedUser)

//     } catch (error) {
//         res.json({success:false,message:"Error in Updating User"})
//     }
       
//     }

        //updateuser
        async function updateUser(id,userData){
            try {
                return await prisma.user.update({
                    where:{id:parseInt(id)},
                    data:userData,
                });
            } catch (error) {
                throw new error("Error updating user");
            }
        }
            //delete user
    async function deleteUser () {
        
        try {
            return await prisma.user.delete({
            where: {id:parseInt(id)},
        });


        } catch (error) {
        res.json({success:false,message:"Error in deleting User"})    
        }
        
    }

    module.exports={
        findUserById,
        createUserByEmailandPassword,
        findUserByEmail,
        getAllUser,
        deleteUser,
        updateUser,

    }