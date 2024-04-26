"use client"
import { useState, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age:number;
}

async function getData(){
  const res = await fetch("http://localhost:3000/user/");
  return res.json();
}

const Users= () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((user) => (
        <div key={user.id}>
          <p className='mb-2'><strong>Name:</strong> {user.firstName}  {user.lastName}</p>
          <p className='mb-2'><strong>Age:</strong>{user.age}</p>
        </div>
      ))}
    </main>
  );
};

export default Users;
