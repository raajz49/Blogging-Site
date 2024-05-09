//in use


"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"


interface Params {
    id: string;
  }
  

const CreateComments = ({ params }: { params: Params })=> {

    const [comments,setComments]=useState({title:"",description:""})
    const [error, setError] = useState<string | number | null>(null);
    const router= useRouter();

    const handleInputChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target;
        setComments((prevData)=>({
            ...prevData,
            [name]:value,
        }))
    }

    const handleSubmit=async(e:React.FormEvent)=>{
            e.preventDefault();

            if(!comments.title || !comments.description){
                setError("Please fill every detail");
                return;
            }
            setError(null);


            
           try {
           
            const response= await fetch(`http://localhost:3001/comments/${params.id}`,{
              method: "POST",
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify(comments)
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
              }
          
              // router.push(`/Api/Comments/Fetch/${params.id}`);
              router.back()
            } catch (error) {
              setError("Something went wrong");
            }
           
    }

  return (
    <div className='flex justify-center items-center flex-col mt-32'>
    <h2 className='text-2xl font-bold my-8'>Add new Comment</h2>
     {error && <p>Error: {error}</p>} 

    <form
    onSubmit={handleSubmit}
     className='flex flex-col w-full max-w-md px-4'>
      <input
        type="text"
        name="title"
        placeholder='Enter Title'
         value={comments.title}
         onChange={handleInputChange}
        className='py-2 px-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
      />

      <input
        type="text"
        name="description"
        placeholder='Enter description' 
         value={comments.description}
         onChange={handleInputChange}
        className='py-2 px-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black'
      />

      <button
        className='bg-blue-600 text-white mt-5 px-4 py-2 rounded-md cursor-pointer'
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
  )
}

export default CreateComments
