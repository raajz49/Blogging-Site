const {PrismaClient} = require("@prisma/client");
const asyncwrapper = require("../asyncwrapper");

const prisma = new PrismaClient();


const getPosts = asyncwrapper(async(req,res)=>{
  
        const allPosts = await prisma.post.findMany();
        res.json(allPosts)

  
       
    })

    const getPostOfUser = async (req, res) => {
        try {
            
        const userId = parseInt(req.params.id);
        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId
            }
        });
        res.json(userPosts);

    } catch (error) {
            res.json({success:false,message:"Error in getting post of user "})
    }
    }

    const putPost=async (req, res) => {
        try {
            
        const id = parseInt(req.params.id);
        const newUserId = req.body.userId;
        const newDescp=req.body.description;
        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: { userId: newUserId, description:newDescp }
        });
        res.json(updatedPost);
        
    } catch (error) {
            res.json({success:false,message:"Erroring in updating posts"})
    }
    }

    const deleteUser=async(req,res)=>{

        try {
            const id=req.params.id;
            const deletedPost = await prisma.post.delete({
                where: {id:parseInt(id)},
            });
            res.json(deletedPost)

        } catch (error) {
            res.json({success:false,message:"Error in deleting User"})
        }
       
    }

    const Post=async(req,res)=>{
        try {
            const newPosts= await prisma.post.createMany({data:req.body});
            res.json(newPosts)

        } catch (error) {
            res.json({success:false,message:"Error in posting posts"})
        }
        
    }

module.exports={


  getPosts,getPostOfUser,putPost, deleteUser,Post
}
