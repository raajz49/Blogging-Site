"use client"


import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";


interface Params {
  id: string;
}

const EditUser = ({params}:{params:Params}) => {
  const [formData,setFormData]=useState({firstName:"",lastName:"",age:"",email:"",address:"" , id:""});
  const [error,setError]=useState<String |number| null>(null);
const router =useRouter();
  useEffect(()=>{
      
    const fetchData=async()=>{
      try {
        const response= await fetch(`http://localhost:3001/user/${params.id}`,{method:"PUT"})
        if(!response.ok){
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log(data);
        setFormData({firstName:data.firstName,lastName:data.lastName,age:data.age,address:data.address,email:data.email,id:data.id});
      } catch (error) {
        setError("Failed to load")
      }
    };
    fetchData();

  },[])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();

    if(!formData.firstName || !formData.lastName || !formData.age || !formData.address || !formData.email || !formData.id){
        setError("Please fill every details")
        return;
    }
    setError(null);

    try {
    const response=  await fetch(`http://localhost:3001/user/${params.id}`,{method:"PUT",
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      router.push('/Api/Users/Fetch')
    } catch (error) {
      setError("Something went wrong")
      
    }
   
  }
    return (
      <div className='flex justify-center items-center flex-col mt-32'>
         
        <h2 className='text-2xl font-bold my-8'>Edit User</h2>
  
      <form
       onSubmit={handleSubmit}
      className='flex  gap-3 flex-col w-1/3'>

  
          {/* <input type="number"
           name="id" 
           placeholder='Enter id'
           value={formData.id}
           onChange={handleInputChange}
          className='py-1 px-4 border rounded-md text-black' /> */}

          <input type="text"
           name="firstName" 
           placeholder='Enter firstName'
           value={formData.firstName}
           onChange={handleInputChange}
          className='py-1 px-4 border rounded-md text-black' />

          <input type="text"
           name="lastName"
           placeholder='Enter lastName'
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
        >Update</button>
      </form>
      {error && <p className="text-red-600">Error: {error}</p>}
      </div>
    ) 
  }
  
  export default EditUser
  