
"use client"

import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    address: "",
    password: ""
  });
  const [error, setError] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === "age" ? parseInt(e.target.value) : e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.age 
      || !formData.email || !formData.address || !formData.password) {
      setError("Please fill every details");
      return;
    }
  
    setError(null);
    setLoading(true); // Set loading to true when the form is submitted
  
    try {
      const response = await fetch(`http://localhost:3001/user`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
  
      const data = await response.json();
      if (data.exists) {
        setError("Email already used");
        return;
      }
      
      router.push('/Api/Users/Fetch');
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false); // Always set loading to false after the request is completed or when an error occurs
    }
  };
    

  return (
    <div className='flex justify-center items-center flex-col mt-32'>
      <h2 className='text-2xl font-bold my-8'>Add new User</h2>
      <form onSubmit={handleSubmit} className='flex gap-3 flex-col w-1/3'>
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

        <input type="password" 
          name="password" 
          placeholder='******'
          value={formData.password}
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
          className='bg-blue-600 text-white mt-5 px-4 py-1 rounded-md cursor-pointer'
          type="submit"
        >
          {loading ? (<p>Loading</p>) : (<p>Add</p>)}
        </button>
      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}

export default CreateUser;
