const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


const getPosts = async(req,res)=>{
        const allPosts = await prisma.post.findMany();
        res.json(allPosts)
    }

    const getPostOfUser = async (req, res) => {
        const userId = parseInt(req.params.id);
        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId
            }
        });
        res.json(userPosts);
    
    }

    const putPost=async (req, res) => {
        const id = parseInt(req.params.id);
        const newUserId = req.body.userId;
        const newDescp=req.body.description;
        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: { userId: newUserId, description:newDescp }
        });
        res.json(updatedPost);
    }

    const deleteUser=async(req,res)=>{
        const id=req.params.id;
        const deletedPost = await prisma.post.delete({
            where: {id:parseInt(id)},
        });
        res.json(deletedPost)
    }

    const Post=async(req,res)=>{
        const newPosts= await prisma.post.create({data:req.body});
        res.json(newPosts)
    }

module.exports={


  getPosts,getPostOfUser,putPost, deleteUser,Post
}
