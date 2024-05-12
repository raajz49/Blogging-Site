"use client"
import React, { useState, useEffect } from 'react';
import Button from '@/Components/Button';
import Loading from '@/Components/Loading';
import { Add, AllInbox, Delete, Edit } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  photoUrl: string;
}

async function getData() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:3001/user/", {
      method: 'GET',
      headers: { 'Authorization': token as string },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

const Users = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
  
      fetchData();
    } else {
      setError("You are not authorized to access this page.");
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/user/${id}`, { method: "DELETE" });
      setData(prevData => prevData.filter(user => user.id !== id));
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='p-8 flex justify-end '>
          <Link href={`/Api/Users/Create`} className='flex p-1 w-32 justify-end items-center mt-10'>
            <Button
              type="submit"
              title="Create User"
              icon={<Add />}
              variant="btn_green"
            />
          </Link>
        </div>
      )}

      {data?.length > 0 ? (
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {data.map((user) => (
            
            <div className=' border-2 border-b-gray-600 px-2 p-8' key={user.id}>
              <div className='ml-10'>
              <Image 
                src={user.photoUrl}
                height="100"
                width="300"
                alt="User Photo"
                priority={true}
                className=" rounded-xl h-[22rem] w-[22rem] object-cover object-center"
              /> 
              <p className='mb-2'><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p className='mb-2'><strong>Email:</strong> {user.email}</p>
              <p className='mb-2'><strong>Age:</strong> {user.age}</p>
              <p className='mb-2'><strong>Address:</strong> {user.address}</p>
              </div>
              <div className='flex flex-row  justify-between gap-3 border-2  rounded-xl border-blue-900 p-1 '>
                <Link href={`/Api/Users/Edit/${user.id}`}>
                  <Button
                    type="submit"
                    title="Edit"
                    icon={<Edit />}
                    variant="btn_blue"
                  />
                </Link>

                <div>
                  <Button
                    type="submit"
                    title="Delete"
                    icon={<Delete />}
                    variant="btn_red"
                    onClick={() => handleDelete(user.id)}
                  />
                </div>

                <Link href={`/Api/Posts/Fetch/${user.id}`}>
                  <Button
                    type="submit"
                    title="Post"
                    icon={<AllInbox />}
                    variant="btn_green"
                  />
                </Link>
              </div>
            </div>
          ))}
        </main>
      ) : (
        <p>No User Found</p>
      )}

      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Users;
