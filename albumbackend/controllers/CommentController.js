const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


const getComments= async(req,res)=>{
    try {
        const allComments = await prisma.comment.findMany();
         res.json(allComments)
    } catch (error) {
        res.json({success:false,message:"Some error occured during fetching comments" })
    }
    
}

const getCommentofUser= async (req, res) => {
    try{
    const postId = parseInt(req.params.id);
    const userComments = await prisma.comment.findMany({
        where: {
            postId: postId
        }
    });
    // throw new error(error);
    res.json(userComments);
}catch (error){
    res.json({success:false,message:"Error in fetching comments from ${id}"})
}
}


const postComments=async(req,res)=>{
    try{
    const newComments=await prisma.comment.createMany({data:req.body});
    res.json(newComments)
    }catch(error){
        res.json({success:false,message:"Error while posting comment"})
    }
}



module.exports={
    getComments,getCommentofUser,postComments
}