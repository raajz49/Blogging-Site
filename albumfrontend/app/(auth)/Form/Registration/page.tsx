
"use client"



import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    address: "",
    password: "",
    photoUrl:""

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
      || !formData.email || !formData.address || !formData.password || !formData.photoUrl) {
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
      
      router.push('/Form/login');
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false); // Always set loading to false after the request is completed or when an error occurs
    }
  };
    

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-16 sm:px-6 lg:px-8">
    <div className='flex justify-center items-center flex-col  '>
      <h2 className='text-5xl font-extrabold  text-black mb-6'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='flex gap-3 flex-col w-1/3'>
       
       <label htmlFor="firstName" className="label_gray">FirstName</label>
        <input type="text"   
          name="firstName" 
          placeholder='FirstName....'
          value={formData.firstName}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="lastName" className="label_gray">LastName</label>
        <input type="text" 
          name="lastName" 
          placeholder=' LastName....'
          value={formData.lastName}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="email" className="label_gray">Email</label>
        <input type="text" 
          name="email" 
          placeholder='Email...'
          value={formData.email}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="password" className="label_gray">Password</label>
        <input type="password" 
          name="password" 
          placeholder='**************'
          value={formData.password}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="age" className="label_gray">Age</label>
        <input type="number" 
          name="age" 
          placeholder='Age.....'
          value={formData.age}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="address" className="label_gray">Address</label>
        <input type="text" 
          name="address" 
          placeholder='Address....'
          value={formData.address}
          onChange={handleInputChange}
          className='input_tag' />

        <label htmlFor="photoUrl" className="label_gray">PhotoUrl</label>          
        <input type="text" 
          name="photoUrl" 
          placeholder='PhotoUrl.....'
          value={formData.photoUrl}
          onChange={handleInputChange}
          className='input_tag' />

<p className="text-indigo-600 hover:text-indigo-500">
  Already have an account?{" "}
  <Link href="/Form/login" className="text-blue-800 hover:underline hover:text-red-600 ">
    Sign in
  </Link>
</p>

        <button 
          className='bg-blue-600 text-white mt-5 px-4 py-1 rounded-md cursor-pointer'
          type="submit"
        >
          {loading ? (<p>Loading....</p>) : (<p>Add</p>)}
        </button>
        


      </form>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
    </div>
  );
}

export default RegistrationForm;
