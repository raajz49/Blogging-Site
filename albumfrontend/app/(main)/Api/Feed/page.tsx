//in use


"use client"
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { Add, AllInbox, Delete, Edit, Filter, SentimentVerySatisfied, Videocam } from "@mui/icons-material";
import { EllipsisVertical, MessageSquare, Share, ThumbsUp } from "lucide-react";
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
    const res = await fetch("http://localhost:3001/feed", {
      method: 'GET',
      headers: { 'Authorization': token as string },
    });
    return res.json();
  }
  
  const Post = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await getData();
          setPosts(result);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
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
      <div className=" mt-10 mx-auto max-w-4xl px-4 ">
        {loading ? (
          <Loading />
        ) : posts?.length > 0 ? (
          <div className="flex flex-col gap-8 ">
            <div className="border-2 border-gray-400 lg:p-8 p-4 rounded-md">
              <div className="flex items-center mb-4">
                <Image
                  src={posts[0].user.photoUrl}
                  height="64"
                  width="64"
                  alt="User avatar"
                  className="rounded-full h-16 w-16 object-cover object-center"
                />
                <Link href={`/Api/Posts/Create`} className="flex-1">
                  <textarea
                    placeholder="Write Something......"
                    className="bg-transparent border-2 border-white rounded-xl px-3 py-1 w-full"
                  />
                </Link>
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
        ) : (
          <p>No post available</p>
        )}
      </div>
    );
  };
  
  export default Post;