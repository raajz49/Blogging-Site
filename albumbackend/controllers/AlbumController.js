const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();



   const getAlbum= async(req,res)=>{
    const allAlbums = await prisma.album.findMany();
    res.json(allAlbums)
}

    const postAlbum=async(req,res)=>{
            const newAlbum=await prisma.album.createMany({data:req.body});
            res.json(newAlbum)
        }

module.exports={
getAlbum,postAlbum
}