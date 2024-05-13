const {PrismaClient} = require("@prisma/client");
const asyncwrapper = require("../asyncwrapper");

const prisma = new PrismaClient();


const getPosts = asyncwrapper(async(req,res)=>{
        
    try{
        const allPosts = await prisma.post.findMany({
      
            select: {
            id: true,
            title: true,
            description: true,
            userId:true,

            user: {
                select: {
                    photoUrl: true,
                    firstName:true,
                    lastName:true,
                    
                }
            }
        }
    })
    
    res.json(allPosts);
} catch (error) {
    res.status(500).json({ success: false, message: "Error in getting posts of user" });
}
})



    const getPostById = async (req, res) => {
      
        try {
            
            const userId = req.user.UserId;
            const id = parseInt(req.params.id);
         
                        
            const postById = await prisma.post.findFirst({
                where: {
                    id: id,
                },
                include: {
                    user: { // Include the related user
                        select: {
                            photoUrl: true, // Select the photoUrl field from the related user
                            firstName:true,
                            lastName:true,
                        }

                    }
                }
            });
            res.json(postById);
        } catch (error) {
            res.json({ success: false, message: "Error in getting post by Id" });
            
        }
    }
    
    const getPostOfUser = async (req, res) => {
        try {
            const userId = req.user.id;
            const userPosts = await prisma.post.findMany({
                where: {
                    userId: userId
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    userId:true,

                    user: {
                        select: {
                            photoUrl: true,
                            firstName:true,
                            lastName:true,
                            
                        }
                    }
                }
            });
            res.json(userPosts);
        } catch (error) {
            res.status(500).json({ success: false, message: "Error in getting posts of user" });
        }
    }
    
    const putPost=async (req, res) => {
        try {
            
        const id = parseInt(req.params.id);
        const newUserId = req.body.userId;
        const newDescp=req.body.description;
        const newTitle=req.body.title;
        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: { userId: newUserId, description:newDescp,title:newTitle, }
        });
        res.json(updatedPost);
        
    } catch (error) {
            res.json({success:false,message:"Erroring in updating posts"})
    }
    }

    const deletePost = async (req, res) => {
        try {
            const userId = req.user.id;  
            const postId = parseInt(req.params.id); // Extract the post ID from request parameters
            const deletedPost = await prisma.post.delete({
                where: { id: postId },
            });
    
            res.json(deletedPost); // Send the deleted post as a JSON response
        } catch (error) {
            res.status(500).json({ success: false, message: "Error in deleting post" }); // Handle any errors that occur during deletion
        }
    };
    

    const Post = async (req, res) => {
        try {
          const userId = req.user.id;
          const newPosts = await prisma.post.createMany({
            data: req.body.map(post => ({ ...post, userId })),
          });
          res.json(newPosts);
        } catch (error) {
          // Handle errors appropriately
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      };
      

module.exports={


  getPosts,getPostOfUser,putPost, deletePost,Post,getPostById
}
