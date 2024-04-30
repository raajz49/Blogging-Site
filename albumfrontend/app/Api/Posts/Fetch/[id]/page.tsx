"use client"

import Button from "@/Components/Button";
import { Add, Comment, Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
}

interface Params {
  id: string;
}

const Post = ({ params }: { params: Params }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/user/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    posts?.length > 0 ? (
      <div>
        <div className="p-8 flex justify-end">
          {/* <Link  href={`/Api/Posts/Create/${user.id}`} className='flex p-1 w-32 justify-end items-center mt-10'>
            <Button
              type="submit"
              title="Create"
              icon={<Add />}
              variant="btn_dark_green"
            />
          </Link> */}
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {posts.map((post) => (
            <div key={post.id} className="border-2 border-red-400 py-10 px-5">
              <p className="underline mb-3"><strong>Id</strong>{post.id}</p>
              <p><strong>Title</strong><div className="mb-3">{post.title}</div></p>
              <p className="mb-2"><strong>Description:</strong><div>{post.description}</div></p>
              
              <div className='flex flex-col lg:flex-row justify-between gap-3 border-2 rounded-xl border-blue-900 p-1'>
                
                <Link
                href={`/Api/Posts/Create/${post.id}`}>
                <Button
                  type="submit"
                  title="Edit"
                  icon={<Edit />}
                  variant="btn_blue"
                />
                </Link>

                <Button
                  type="submit"
                  title="Delete"
                  icon={<Delete />}
                  variant="btn_red"
                />

                <Link href={`/Api/Comments/Fetch/${post.id}`} >
                  <Button
                    type="submit"
                    title="Comments"
                    icon={<Comment />}
                    variant="btn_green"
                    
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className="flex justify-center items-center font-serif text-red-600 text-5xl h-screen">No Post Found</p>
    )
  )
}

export default Post;
