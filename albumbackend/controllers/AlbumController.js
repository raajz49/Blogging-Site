const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();



   const getAlbum= async(req,res)=>{
    try {
        
    const allAlbums = await prisma.album.findMany();
    // throw new Error('some error')
    res.json(allAlbums)

    
} catch (error) {
    res.json({ success: false, message: "some error occurred during fetch" });
    // console.error("Error fetching albums.");
}
}


const getAlbumById= async(req,res)=>{
    try {
        // const userId=req.user.userId;
        const id = parseInt(req.params.id);

        const albumById= await prisma.album.findFirst({
            where:{
                id:id,
            },
        })
        res.json(albumById)
    } catch (error) {
        res.json({ success: false, message: "some error occurred during post" });
            console.error(error)
    }
}

const getAlbumOfUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userAlbums = await prisma.album.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                title: true,

                user: {
                    select: {
                        photoUrl: true,
                        firstName:true,
                        lastName:true,
                        
                    }
                }
            }
        });
        res.json(userAlbums);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in getting posts of user" });
    }
}

    const postAlbum = async (req, res) => {
  try {
    const userId = req.user.id;
    let albumsData = req.body;

    if (!Array.isArray(albumsData)) {
      albumsData = [albumsData];
    }

    const newAlbums = await prisma.album.createMany({
      data: albumsData.map(album => ({ ...album, userId })),
    });

    res.json(newAlbums);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const putAlbum=async (req, res) => {
    try {
        
    const id = parseInt(req.params.id);
    const newUserId = req.body.userId;
    const newTitle=req.body.title;
    const updatedAlbum = await prisma.album.update({
        where: { id: id },
        data: { userId: newUserId,title:newTitle, }
    });
    res.json(updatedAlbum);
    
} catch (error) {
        res.json({success:false,message:"Erroring in updating album"})
}
}

const deleteAlbum = async (req, res) => {
    try {
        const userId = req.user.id;  
        const postId = parseInt(req.params.id); // Extract the post ID from request parameters
        const deletedAlbum = await prisma.album.delete({
            where: { id: postId },
        });

        res.json(deletedAlbum); // Send the deleted post as a JSON response
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in deleting Album" }); // Handle any errors that occur during deletion
    }
};      

module.exports={
getAlbum,postAlbum,getAlbumById,getAlbumOfUser,putAlbum,deleteAlbum
}