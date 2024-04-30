"use client"
import Button from '@/Components/Button';
import { Add, AllInbox, Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age:number;
  email:string;
  address:string;
  
}



async function getData(){
  const res = await fetch("http://localhost:3000/user/");
  return res.json();
}

const Users= () => {
  const [data, setData] = useState<User[]>([]);
  const [error,setError]=useState<String | null>(null);

  

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

    const handleDelete = async(id:number)=>{
        try{
          await fetch(`http://localhost:3000/user/${id}`,{method:"DELETE"});
          setData(prevData => prevData.filter(user => user.id !== id));
        }catch(error){
            setError("Failed to delete user.Please try again");
        }
    }
    
  return (
    data?.length> 0 ?(
    <div>
      <div className='p-8 flex justify-end '>
      <Link href={`/Api/Users/Create`} className='flex p-1 w-32 justify-end items-center mt-10'>
      <Button
         type="submit"
         title="Create"
         icon={<Add />}
         variant="btn_green"
         />
      </Link>
      </div>
    <main className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {data.map((user) => (
        <div className='border-2 border-b-gray-600 px-2 p-8  ' key={user.id}>
        {/* <p className='mb-2'><strong>Id:</strong> {user.id}</p> */}
          <p className='mb-2'><strong>Name:</strong> {user.firstName}  {user.lastName}</p>
          <p className='mb-2'><strong>Email:</strong> {user.email}</p>
          <p className='mb-2'><strong>Age:</strong> {user.age}</p>
          <p className='mb-2'><strong>Address:</strong> {user.address}</p>
          <div className='flex flex-row  justify-between gap-3 border-2  rounded-xl border-blue-900 p-1 '>
          <Link href={`/Api/Users/Edit/${user.id} `} className=' rounded-xl p-1 px-3'>
          <Button
         type="submit"
         title="Create"
         icon={<Edit/>}
         variant="btn_blue"
         />
      </Link>

            <div className='rounded-xl p-1 px-2'>
          <Button
           type="submit"
           title="Delete"
           icon={<Delete/>}
           variant="btn_red"
          onClick={()=>handleDelete(user.id)}  />
          </div>
          
          <Link href={`/Api/Posts/Fetch/${user.id}`} className=' rounded-xl p-1 '>
           <Button
            type="submit"
            title="Post"
            icon={<AllInbox/>}
            variant="btn_green" />
           </Link>
          </div>
        
        </div>
      ))}
    </main>
    </div>
    ):(
      <p>No User Found</p>
    )
  );
 };

export default Users;
