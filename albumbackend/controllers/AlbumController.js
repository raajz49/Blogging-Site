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


    const postAlbum=async(req,res)=>{
        try {
            const newAlbum=await prisma.album.createMany({data:req.body});
            res.json(newAlbum)
            
        } catch (error) {
            res.json({ success: false, message: "some error occurred during post" });
            console.error("Error in posting albums.")
        }
       
        }

module.exports={
getAlbum,postAlbum
}