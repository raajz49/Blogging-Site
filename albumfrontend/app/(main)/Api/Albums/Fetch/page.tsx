"use client"

interface Albums{
  id: number;
  title: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { Add, Delete, Edit, Photo } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";

    async function getData (){
      const token = localStorage.getItem('token');
    const res= await fetch("http://localhost:3001/albums",
      {
        method:'GET',
        headers:{'Authorization':token as string}
      }
    ) 
    return res.json();

}

const Albums = () => {

    const [albums,setAlbum]=useState<Albums[]>([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              setLoading(true)
              const result = await getData();
              setAlbum(result);
              setLoading(false)
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false)
            }
          };
          
          fetchData();
        }, []);

      const handleDelete=async(id:number)=>{
        try{
          const token=localStorage.getItem("token");
          if(!token){
            throw new Error("Token not found");
          }
          await fetch(`http://localhost:3001/albums/${id}`, {
            method: "DELETE",
            headers: { Authorization: token },
          });
          setAlbum(prevData=>prevData.filter(album=>album.id !==id));
        }catch(error){
          console.error("Failed to delete post. Please try again.");
        }
      }

  return (
    <div>
       <div className='p-8 flex justify-end flex-row'>
    <Link href={`/Api/Albums/Create`} className='flex p-1 w-48 justify-end items-center mt-10'>
    <Button
      type="submit"
      title="Create Album"
      icon={<Add />}
      variant="btn_green"
    />
  </Link>
  </div>
  <div>
    {loading?(
      <Loading />
    ):(
    <main className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-8 lg:p-20">
      {albums.map((album) => (
        <div key={album.id} className="border-2 border-red-400 py-10 px-5">
          <p className="flex justify-between text-xl"><strong >AlbumId:  {album.id}</strong></p>
          <p className="text-xl mb-3"><strong>Name:</strong> {album.title}</p>

          <div className='flex flex-col lg:flex-row justify-between gap-3 w-full '>
                
                <Link
                href={`/Api/Albums/Edit/${album.id}`}>
                <Button
                  type="submit"
                  title=""
                  icon={<Edit />}
                  variant="btn_blue1"
                />
                </Link> 

                <Button
                  type="submit"
                  title=""
                  icon={<Delete />}
                  variant="btn_red1"
                  onClick={() => handleDelete(album.id)}
                />

                 <Link href={`/Api/Photos/Fetch/${album.id}`} > 
                  <Button
                    type="submit"
                    title=""
                    icon={<Photo />}
                    variant="btn_green1"
                    
                  />
                 </Link> 
              </div>
        </div>
      ))}
    </main>
    )}
    </div>
    </div>
  )
}

export default Albums
