"use client"

import Link from "next/link";
import { useEffect, useState } from "react";


interface Post{
    id:number;
    title:string;
    description:string;

}
async function getData(){
    const res= await fetch("http://localhost:3000/posts");
    return res.json();
}

const Post = () => {
    const [posts,setPosts]=useState<Post[]>([]);

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                const result= await getData();
                setPosts(result);
            }catch (error) {
                console.error('Error fetching data:', error);
              }
            };
            fetchData();
         }, [])
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 lg-p-20 " >
     
      {posts.map((post)=>(
        <div key={post.id} className="border-2 border-red-400 py-10 px-5">
             <p className="underline mb-3" ><strong>Id</strong>
             {post.id}</p>
           
             <p><strong>Title</strong>
             <div className="mb-3">{post.title}</div></p>
            
             <p className="mb-2"><strong>Description:</strong>
             <div>{post.description}</div></p>
        </div>
      ))}
    </div>
  )
}

export default Post
