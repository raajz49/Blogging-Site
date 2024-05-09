//not in use

"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";


interface Params {
    id: string;
  }
  

const CreatePost = ({ params }: { params: Params }) => {
        
    const [formData,setFormData]=useState({title:"",description:""});
    const [error,setError]=useState<String |number| null>(null);

    const router=useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, 
        }));
    };
    

      const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
    
        if(!formData.title || !formData.description){
            setError("Please fill every details")
            return;
        }
        setError(null);
    
        try {
        const response=  await fetch(`http://localhost:3001/post/${params.id}`,{method:"POST",
            headers:{
              'Content-type':'application/json',
            },
            body:JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error("Failed to create user");
          }
          router.push('/Api/Users/Fetch')
        } catch (error) {
          setError("Something went wrong")
          
        }
       
      }

  return (
    <div className='flex justify-center items-center flex-col mt-32'>
       
    <h2 className='text-2xl font-bold my-8'>Add new Post</h2>
    {error && <p>Error: {error}</p>}

  <form
  onSubmit={handleSubmit}
   className='flex  gap-3 flex-col w-1/3'>
    
      <input type="text" 
      name="title" 
      placeholder='Enter Title'
      value={formData.title}
      onChange={handleInputChange}
      className='py-1 px-4 border rounded-md text-black' />

      <input type="text" 
      name="description" 
      placeholder='Enter description'
      value={formData.description}
      onChange={handleInputChange}
      className='py-1 px-4 border rounded-md text-black' />

    
      <button 
       className='bg-blue-600 text-white mt-5 px-4 py-1 rounded-md cursor-pointer  '
       type="submit"
      >Add</button>
  </form>

  </div>
  )
}

export default CreatePost
