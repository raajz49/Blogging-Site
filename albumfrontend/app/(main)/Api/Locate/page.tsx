"use client"
import Loading from '@/Components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Album {
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

async function getAlbumData() {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/albums/user", {
    method: 'GET',
    headers: { 'Authorization': token as string },
  });
  return res.json();
}

async function getPostData() {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/posts/user", {
    method: 'GET',
    headers: { 'Authorization': token as string },
  });
  return res.json();
}

const LocateUser = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true)
        const result1 = await getAlbumData();
        setAlbums(result1.slice(0, 3));
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching album data:', error);
      }
    };
    fetchAlbumData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        const result2 = await getPostData();
        setPosts(result2.slice(0, 3));
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching post data:', error);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div className='container mx-auto'>
        {loading ? (
      <Loading />
      ) : (
        <div>
        <div className='flex justify-center mt-10 '>
        {posts.length>0 && (
            <div> 
               <div className='flex justify-center'>
  <div className="overflow-hidden h-56 w-68 rounded-full">
    <Image
      src={posts[0].user.photoUrl}
      height="100"
      width="200"
      alt="GFG logo served from external URL"
      className="object-cover object-center"
      priority
    />
  </div>
</div>

            <div className='flex flex-col justify-center'>
            <p className='text-2xl font-sans font-bold text-gray-300 mt-6 mx-auto'>Hi I'm {posts[0].user.firstName} {posts[0].user.lastName}</p>
            <p className="text-2xl font-sans font-bold text-gray-300  mx-auto">These are my Posts and Albums</p>
            </div>
            </div>
            

           
        )}

        </div>
    
      <div className='flex flex-col justify-center items-center gap-10 mt-10 p-10'>
        <div className='border border-blue-500 p-4 w-3/4'>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {albums.map((album) => (
              <div key={album.id} className="border border-red-400 p-4">
                <p className="font-bold mb-2">ID: {album.id}</p>
                <p className="mb-2"><strong>Title:</strong> {album.title}</p>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
          <Link href={'/Api/Albums/Fetch'} className='text-blue-500 hover:underline'>
            Seemorealbums....
          </Link>
          </div>
        </div>

        <div className='border border-blue-500 p-4 w-3/4'>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-red-400 p-4">
                <p className="font-bold mb-2">ID: {post.id}</p>
                <p className="mb-2"><strong>Title:</strong> {post.title}</p>
                <p className="mb-2"><strong>Description:</strong> {post.description}</p>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
          <Link href={'/Api/Posts/Fetch'} className='text-blue-500 hover:underline'>
            Seemoreposts....
          </Link>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default LocateUser;
