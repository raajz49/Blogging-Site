//in use


"use client"
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { Add, AllInbox, Delete, Edit, Logout } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

async function getData() {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/posts", {
    method: 'GET',
    headers: { 'Authorization': token as string },
  });
  return res.json();
}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getData();
        setPosts(result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      await fetch(`http://localhost:3001/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      setPosts(prevData => prevData.filter(post => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <div>
      <div className='p-8 flex justify-end flex-row'>
        <Link href={`/Api/Posts/Create`} className='flex p-1 w-48 justify-end items-center mt-10'>
          <Button
            type="submit"
            title="Create Post"
            icon={<Add />}
            variant="btn_green"
          />
        </Link> 
      </div>

      {posts?.length > 0 ? (
        <div>
          {loading ? (
            <Loading />
          ):(
            <div>
          <div className="flex justify-center items-center  mx-auto mt-[-14px] mb-3">
            <Image
              src={posts[0].user.photoUrl}
              height="500"
              width="400"
              alt="GFG logo served from external URL"
              className="rounded-full h-56 w-56 object-cover object-center"
            />
          </div>
          <div className=" flex items-center flex-col mr-10"> 
          <p className="text-lg font-bold text-white ml-10 mt-[-10px] p-2 underline">UserId: {posts[0].userId}</p>
          <p className="text-lg font-bold text-white ml-10 mt-[-10px] p-2" >Hi I'm {posts[0].user.firstName}  {posts[0].user.lastName}</p>
          <p className="text-lg font-bold text-white ml-10 mt-[-14px] p-2">And these are my posts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg-p-20">
            {posts.map((post) => (
              <div key={post.id} className="border-2 border-red-400 py-10 px-5">
                <p className="underline mb-3"><strong>Id</strong> {post.id}</p>
                <h6><strong>Title</strong><div className="mb-3">{post.title}</div></h6>
                <h6 className="mb-2"><strong>Description:</strong><div>{post.description}</div></h6>
                <div className='flex flex-row justify-between gap-3 border-2 rounded-xl border-blue-900 p-1 '>
                  <Link href={`/Api/Posts/Edit/${post.id}`}>
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
                      onClick={() => handleDelete(post.id)}
                    />
                  </div>
                  <Link href={`/Api/Comments/Fetch/${post.id}`}>
                    <Button
                      type="submit"
                      title="Comments"
                      icon={<AllInbox />}
                      variant="btn_green"
                    />
                  </Link>
                </div>
              </div>
              
            ))}
            </div>
          </div>
          )}
        </div>
      ) : (
        <p>No post available</p>
      )}
    </div>
  );
};

export default Post;
