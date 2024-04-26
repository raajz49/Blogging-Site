"use client"

interface Albums{
    id :number;
    title:string;
}
import { useEffect, useState } from "react";

    async function getData (){
    const res= await fetch("http://localhost:3000/albums") 
    return res.json();

}

const Albums = () => {

    const [albums,setAlbum]=useState<Albums[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const result = await getData();
              setAlbum(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          
          fetchData();
        }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {albums.map((albums) => (
        <div key={albums.id}>
          <p className='mb-2'><strong>Name:</strong> {albums.id}  {albums.title}</p>
        </div>
      ))}
    </main>
  )
}

export default Albums
