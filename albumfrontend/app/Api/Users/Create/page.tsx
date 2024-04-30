"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"


const CreateUser = () => {

  const [formData,setFormData]=useState({firstName:"",lastName:"",age:"" ,email:"",address:""});
  const [error,setError]=useState<String |number| null>(null);

  const router=useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };
  
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();

    if(!formData.firstName || !formData.lastName || !formData.age ||!formData.email ||!formData.address){
        setError("Please fill every details")
        return;
    }
    setError(null);

    try {
    const response=  await fetch(`http://localhost:3000/user`,{method:"POST",
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
       
      <h2 className='text-2xl font-bold my-8'>Add new User</h2>
      {error && <p>Error: {error}</p>}

    <form
    onSubmit={handleSubmit}
     className='flex  gap-3 flex-col w-1/3'>
      
        <input type="text" 
        name="firstName" 
        placeholder='Enter FirstName'
        value={formData.firstName}
        onChange={handleInputChange}
        className='py-1 px-4 border rounded-md text-black' />

        <input type="text" 
        name="lastName" 
        placeholder='Enter LastName'
        value={formData.lastName}
        onChange={handleInputChange}
        className='py-1 px-4 border rounded-md text-black' />

      <input type="text" 
        name="email" 
        placeholder='Enter Email'
        value={formData.email}
        onChange={handleInputChange}
        className='py-1 px-4 border rounded-md text-black' />

         <input type="number" 
         name="age" 
         placeholder='Enter Age'
         value={formData.age}
         onChange={handleInputChange}
        className='py-1 px-4 border rounded-md text-black' />

        <input type="text" 
        name="address" 
        placeholder='Enter Address'
        value={formData.address}
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

export default CreateUser
