const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

const getphoto=async(req,res)=>{
    const allPhotos = await prisma.photo.findMany();
    res.json(allPhotos)
}


const getphotoofalbum=async (req, res) => {
    const albumId = parseInt(req.params.id);
    const albumPhotos = await prisma.photo.findMany({
        where: {
            albumId: albumId
        }
    });
    res.json(albumPhotos);
};

const postPhoto=async(req,res)=>{
    const newPhotos=await prisma.photo.createMany({data:req.body});
    res.json(newPhotos)
};


module.exports={
getphoto,getphotoofalbum,postPhoto
  }
  