

"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent,useState } from "react";



const CreateAlbum = () => {
    const [formData, setFormData] = useState({ title: ""});
    const [error, setError] = useState<string | number | null>(null);
    const router = useRouter();


    const handleSubmit=async(e:React.FormEvent)=>{
            e.preventDefault();

            if(!formData.title){
                setError("Please fill every detail");
                     return;
            }
            setError(null);

            
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Token not found");
        }
    
        const postData = [formData]; // Wrap formData in an array
    
        const response = await fetch(`http://localhost:3001/albums`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(postData), // Send postData as an array
        });
    
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
    
        router.push('/Api/Albums/Fetch');
      } catch (error) {
        setError("Something went wrong");
       
      }
    }
    
    const handleInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
            const {name,value}=e.target;
            setFormData((prevData)=>({
                   ...prevData,
                   [name]: value, 
            }))
    }
    
  return (
    <div className='flex justify-center items-center flex-col mt-32'>
           <h2 className='text-2xl font-bold my-8'>Add new Post</h2>

           {error && <p>Error: {error}</p>}
       <form onSubmit={handleSubmit} className='flex gap-3 flex-col w-1/3'>
        
        <input
          type="text"
          name="title"
          placeholder='Enter Title'
          value={formData.title}
          onChange={handleInputChange}
          className='py-1 px-4 border rounded-md text-black'
        />

        <button
          className='bg-blue-600 text-white mt-5 px-4 py-1 rounded-md cursor-pointer'
          type="submit"
        >
          Add
        </button>
        </form>
    </div>
  )
}

export default CreateAlbum
