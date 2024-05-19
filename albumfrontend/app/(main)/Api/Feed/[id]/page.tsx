"use client"

import React, { useState, useEffect } from 'react';
import Button from '@/Components/Button';
import Loading from '@/Components/Loading';
import { Add, AllInbox, Delete, Edit, Filter, SentimentVerySatisfied, Videocam } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { EllipsisVertical, MessageSquare, Share, ThumbsUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import CreatePost from '../../Posts/Create/page';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


interface Post {
    id: number;
    title: string;
    description: string;
    userId: string;
    user: {
      firstName: string;
      lastName: string;
      photoUrl: string;
    };
  }


interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  photoUrl: string;
}

interface Params {
  id: string;
}

async function getpostData() {
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:3001/feed", {
      method: 'GET',
      headers: { 'Authorization': token as string },
    });
    return res.json();
  }
  

const UserFetch = ({ params }: { params: Params }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error("Token not found");
          }
  
          const res = await fetch(`http://localhost:3001/user/${params.id}`, {
            method: 'GET',
            headers: { 'Authorization': token },
          });
  
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const userData = await res.json();
          setData(userData);
        } catch (error) {
          setError("shit happen");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [params.id]);

    useEffect(() => {
        const fetchpostData = async () => {
          try {
            setLoading(true);
            const result = await getpostData();
            setPosts(result);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
        fetchpostData();
      }, []);

  
    if (loading) {
      return <Loading />; // Assuming you have a Loading component
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!data) {
      return <p>No user data available</p>;
    }
        return (
            <div className=" mt-10 mx-auto max-w-4xl px-4 ">
              <div className="flex flex-col gap-8 ">
                <div className="border-2 border-gray-400 lg:p-8 p-4 rounded-md "key={data.id}>
                  <div className="flex  mb-4">
                    <Image
                      src={data.photoUrl}
                      height="64"
                      width="64"
                      alt="User avatar"
                      className="rounded-full h-16 w-16 object-cover object-center"
                    />             
              <div className='w-full   lg:ml-5 ml-2  '>
             
              <CreatePost /> 
              </div> 
                        
                  </div>
                  <div className="flex justify-start md:justify-center  md:gap-20 gap-2 ">
                    <Button
                      type="submit"
                      title="Live video "
                      icon={<Videocam />}
                      variant="btn_emoji"
                      iconColor="red"
                    />
                    <Button
                      type="submit"
                      title="Pic/Video "
                      icon={<Filter style={{ color: "green" }} />}
                      variant="btn_emoji"
                      iconColor="green"
                    />
                    <Button
                      type="submit"
                      title="Feeling  "
                      icon={<SentimentVerySatisfied  />}
                      variant="btn_emoji"
                      iconColor="yellow"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  {posts.map((post) => (
                    <div key={post.id} className="border-2 border-gray-400 p-4 rounded-md">
                      <div className="flex items-start mb-2">
                        <Image
                          src={post.user.photoUrl}
                          height="64"
                          width="64"
                          alt="User avatar"
                          className="rounded-full h-16 w-16 object-cover object-center"
                        />
                        <div className="ml-4">
                          <h6 className="text-gray-200">{post.user.firstName} {post.user.lastName}</h6>
                          <p className="text-[10px] text-gray-300">1 month ago</p>
                        </div>
                        <div className="ml-auto">
                          <EllipsisVertical />
                        </div>
                      </div>
                      <h6 className="mt-3">{post.title}</h6>
                      <p className="text-[12px] text-gray-300 font-sans font-extralight">{post.description}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          type="submit"
                          title=""
                          icon={<ThumbsUp />}
                          variant="btn_like"
                        />
                        <Button
                          type="submit"
                          title=""
                          icon={<MessageSquare />}
                          variant="btn_like"
                        />
                        <Button
                          type="submit"
                          title=""
                          icon={<Share />}
                          variant="btn_like"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        );
      };
      
      export default UserFetch;