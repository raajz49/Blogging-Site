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
    const res = await fetch("http://localhost:3001/posts/user", {
      method: 'GET',
      headers: { 'Authorization': token as string },
    });
    return res.json();
  }

const PostDetails = () => {
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

  return (
    <div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg-p-20">
            {posts.map((post) => (
              <div key={post.id} className="border-2 border-red-400 py-10 px-5">
                <p className="underline mb-3"><strong>Id</strong> {post.id}</p>
                <h6><strong>Title</strong><div className="mb-3">{post.title}</div></h6>
                <h6 className="mb-2"><strong>Description:</strong><div>{post.description}</div></h6>
    </div>
))}
    </div>
    </div>
  )
}

export default PostDetails
