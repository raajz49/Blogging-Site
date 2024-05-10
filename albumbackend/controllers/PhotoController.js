const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

const getphoto=async(req,res)=>{

    try {
        const allPhotos = await prisma.photo.findMany();
    res.json(allPhotos)

    } catch (error) {
        res.json({success:false,message:"Error in fetching photos"})
        
    }
    
}


const getphotoofalbum=async (req, res) => {
    
    try {
        const albumId = parseInt(req.params.id);
    const albumPhotos = await prisma.photo.findMany({
        where: {
            albumId: albumId
        }
    });
    res.json(albumPhotos);
    
    } catch (error) {
        res.json({success:false,message:"Error in fetcing photos from album"})
    }
    
};

const getPhotoById = async (req, res) => {
    try {
        const albumId = parseInt(req.params.albumId); 
        const photoId = parseInt(req.params.photoId); 

        const photo = await prisma.photo.findFirst({
            where: {
                 id: photoId,
                // postId: postId
            }
        });

        if (photo) {
            res.json(photo);
        } else {
            res.status(404).json({ success: false, message: 'Photo not found' });
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const postPhoto=async (req, res) => {
    try {
        const albumId = parseInt(req.params.id);
        
        const newPhoto = await prisma.photo.create({
            data: {
                albumId: albumId,
                ...req.body 
            }
        });
        res.json(newPhoto);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while posting photo" });
    }
}

const deletePhoto=async(req,res)=>{
    try {
        const id=parseInt(req.params.id);
        const deletedPhoto=await prisma.photo.delete({
            where:{
                id:id
            }
           
        })
        res.json(deletedPhoto)
    } catch (error) {
        res.json({status:false,message:"Error in delete photo"})
    }
  
}


module.exports={
getphoto,getphotoofalbum,postPhoto,getPhotoById,deletePhoto
  }
  