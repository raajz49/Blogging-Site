"use client"

import { useEffect, useState } from "react";


interface Comment{
    id:number;
    title:string;
    description:string;

}
async function getData(){
    const res= await fetch("http://localhost:3001/comments");
    return res.json();
}

const Post = () => {
    const [comments,setComments]=useState<Comment[]>([]);

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                const result= await getData();
                setComments(result);
            }catch (error) {
                console.error('Error fetching Comment data:', error);
              }
            };
            fetchData();
         }, [])
  return (
    comments?.length> 0 ?(
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 lg-p-20 " >
      {comments.map((comment)=>(
        <div key={comment.id} className="border-2 border-red-400 py-10 px-5">
             <p className="underline mb-3" ><strong>Id</strong>
             {comment.id}</p>
           
             <p><strong>Title</strong>
             <div className="mb-3">{comment.title}</div></p>
            
             <p className="mb-2"><strong>Description:</strong>
             <div>{comment.description}</div></p>
        </div>
      ))}
    </div>
     ):(
      <p className="flex justify-center items-center text-red-600 text-5xl mt-64 ">No Comments Found</p>
    )
  )
}

export default Post
