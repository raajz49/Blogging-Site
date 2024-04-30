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
    <main className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-8 lg:p-20">
      {albums.map((albums) => (
        <div key={albums.id} className="border-2 border-red-400 py-10 px-5">
          <p><strong className="flex justify-between ml-20 "> {albums.id}</strong></p>
          <p><strong>Name:</strong> {albums.title}</p>
        </div>
      ))}
    </main>
  )
}

export default Albums
