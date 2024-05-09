"use client"


import { useRouter } from "next/navigation";
import { title } from "process";
import { ChangeEvent, useEffect, useState } from "react";

interface Params {
  id: string;
}



const EditUser = ({ params }: { params: Params }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState<string | number | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        // console.log(token)
        const response = await fetch(
          `http://localhost:3001/posts/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
          
        );
        

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFormData({ title: data.title, description: data.description });
       
      } catch (error) {
        setError("Failed to load");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(
        `http://localhost:3001/posts/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      router.push("/Api/Posts/Fetch");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-32">
      <h2 className="text-2xl font-bold my-8">Edit User</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col w-1/3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-md text-black"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="py-1 px-4 border rounded-md text-black"
        />

        <button
          className="bg-blue-600 text-white mt-5 px-4 py-1 rounded-md cursor-pointer"
          type="submit"
        >
          Update
        </button>
      </form>
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default EditUser;
