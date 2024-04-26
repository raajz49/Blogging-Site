"use client"

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
    <div >
      {posts.map((post)=>(
        <div key={post.id} className="mb-2'">
             <p className="underline" ><strong>Id</strong> {post.id}</p>
             <p><strong>Title</strong>{post.title}</p>
             <p className="mb-2"><strong>Description:</strong>{post.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Post
