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

const postPhoto=async(req,res)=>{
    try {
        const newPhotos=await prisma.photo.createMany({data:req.body});
    res.json(newPhotos)

    } catch (error) {
        res.json({success:false,message:"Error in posting new photos "})
    }
   
};


module.exports={
getphoto,getphotoofalbum,postPhoto
  }
  