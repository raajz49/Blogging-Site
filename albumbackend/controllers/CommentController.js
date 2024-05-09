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


const getCommentById = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId); 
        const commentId = parseInt(req.params.commentId); 

        const comment = await prisma.comment.findFirst({
            where: {
                 id: commentId,
                // postId: postId
            }
        });

        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ success: false, message: 'Comment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getCommentofPost= async (req, res) => {
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


const postComments = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        
        const newComment = await prisma.comment.create({
            data: {
                postId: postId,
                ...req.body 
            }
        });
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while posting comment" });
    }
}


const deleteComments = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deletecomment = await prisma.comment.delete({
            where: {
                id: id
            },
        });
       
        res.json({ message: "Deleted comments", deletecomment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while deleting comment" });
    }
}

const putComments=async(req,res)=>{
    try {
        const id=parseInt(req.params.id);
        const postId=parseInt(req.params.postId);
        const newTitle=req.body.title
        const newDescp=req.body.description
        const updatedcomment=await prisma.comment.update({
            where:{id:id},
            data: {  description:newDescp,title:newTitle }
    })
        res.json(updatedcomment)
    } catch (error) {
       console.error()
    }
}

module.exports={
    getComments,getCommentofPost,postComments,getCommentById,deleteComments,putComments
}