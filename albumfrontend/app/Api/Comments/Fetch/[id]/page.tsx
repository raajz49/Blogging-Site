"use client"

import Button from "@/Components/Button";
import { Add, Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Comment{
    id:number;
    title:string;
    description:string;

}

interface Params {
    id: string;
  }


const Post = ({params}:{params:Params}) => {
    const [comments,setComments]=useState<Comment[]>([]);
    const [error,setError]=useState<String |number| null>(null);

    useEffect(()=>{

        const fetchData=async()=>{
        try {
            const response= await fetch(`http://localhost:3001/comments/posts/${params.id}`)
        if(!response.ok){
          throw new Error("Failed to fetch"); 
        }
        const data = await response.json();
        setComments(data)
     } catch (error) {
            setError("Failed to load")
        }
    };
    fetchData();
         }, [])
  return (
    comments?.length> 0 ?(
      <div>
      <div className="p-8 flex justify-end">
        <Link href={`/Api/Users/Create`} className='flex p-1 w-32 justify-end items-center mt-10'>
          <Button
            type="submit"
            title="Create"
            icon={<Add />}
            variant="btn_dark_green"
          />
        </Link>
      </div>
      
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg-p-20 " >
      {comments.map((comment)=>(
        <div key={comment.id} className="border-2 border-red-400 py-10 px-5">
             <p className="underline mb-3" ><strong>Id</strong>
             {comment.id}</p>
           
             <p><strong>Title</strong>
             <div className="mb-3">{comment.title}</div></p>
            
             <p className="mb-2"><strong>Description:</strong>
             <div>{comment.description}</div></p>

             <div className='flex flex-row  gap-3 border-2  rounded-xl border-blue-900 p-1 '>
          {/* <Link href={`/Api/Users/Edit/${user.id} `} className=' rounded-xl p-1 px-3'> */}
          <Button
         type="submit"
         title="Edit"
         icon={<Edit/>}
         variant="btn_blue"
         />
      {/* </Link> */}

            <div className='rounded-xl p-1 px-2'>
          <Button
           type="submit"
           title="Delete"
           icon={<Delete/>}
           variant="btn_red"
          // onClick={()=>handleDelete(user.id)} 
           />
          </div>
          </div>
        
        </div>
      ))}
        {error && <p className="text-red-600">Error: {error}</p>}
    </div>
    </div>
     ):(
      <p className="flex justify-center items-center font-serif text-red-600 text-5xl h-screen">No Comments Found</p>
    )
  )
}

export default Post
