const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


const getComments= async(req,res)=>{
    const allComments = await prisma.comment.findMany();
    res.json(allComments)
}

const getCommentofUser= async (req, res) => {
    const postId = parseInt(req.params.id);
    const userComments = await prisma.comment.findMany({
        where: {
            postId: postId
        }
    });
    res.json(userComments);
}


const postComments=async(req,res)=>{
    const newComments=await prisma.comment.createMany({data:req.body});
    res.json(newComments)
}
module.exports={
    getComments,getCommentofUser,postComments
}