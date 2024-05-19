//in use

"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Button from "@/Components/Button";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState<string | number | null>(null);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.description) {
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
  
      const response = await fetch(`http://localhost:3001/posts`, {
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
  
      router.push('/Api/Posts/Fetch');
    } catch (error) {
      setError("Something went wrong");
    }
  };
  

  return (
    <div>
      {/* <h2 className='text-2xl font-bold my-8'>Add new Post</h2> */}
      {error && <p>Error: {error}</p>}
    
      <form onSubmit={handleSubmit} className='flex gap-3 flex-col '>
          <div>
        <input
          type="text"
          name="title"
          placeholder='Enter Title'
          value={formData.title}
          onChange={handleInputChange}
          className="  w-full text-black overflow-hidden"
        />

        <ReactQuill 
        theme="snow"
         
        value={formData.description}
        placeholder="Write Something......"
        onChange={handleQuillChange} 
        className="  w-full text-black bg-gray-300"
        />
        </div>
        <div className="flex justify-end">
        <Button
        type="submit"
        title="Post"
        variant="btn_green2"
        />
      </div>
        
      </form>
    </div>
  );
};

export default CreatePost;
