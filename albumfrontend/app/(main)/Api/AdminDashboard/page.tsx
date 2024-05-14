//in use


"use client"
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { Add, AllInbox, Delete, Edit, Logout, Photo } from "@mui/icons-material";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserFetch from "../Users/Fetch/page";


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

interface Albums{
  id: number;
  title: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
}

async function getAlbumData (){
  const token = localStorage.getItem('token');
const res= await fetch("http://localhost:3001/albums",
  {
    method:'GET',
    headers:{'Authorization':token as string}
  }
) 
return res.json();

}

async function getData() {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:3001/posts", {
    method: 'GET',
    headers: { 'Authorization': token as string },
  });
  return res.json();
}

const Admin = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums,setAlbum]=useState<Albums[]>([]);
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

  useEffect(()=>{
    const fetchAlbumData = async () => {
        try {
          setLoading(true)
          const result = await getData();
          setAlbum(result);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      };
      
      fetchAlbumData();
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

  const handleDelete1=async(id:number)=>{
    try{
      const token=localStorage.getItem("token");
      if(!token){
        throw new Error("Token not found");
      }
      await fetch(`http://localhost:3001/albums/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      setAlbum(prevData=>prevData.filter(album=>album.id !==id));
    }catch(error){
      console.error("Failed to delete post. Please try again.");
    }
  }

  return (
    <div>

      {posts?.length > 0 ? (
        <div className="mt-20">
          {loading ? (
            <Loading />
          ):(
            <div>
          <div className="flex items-center ml-10 mt-[-14px] mb-3">
            <UserFetch />
          </div>
          <div className=" flex justify-center items-center flex-col mr-10"> 
          <p className="text-gray-200 text-4xl  font-serif font-semibold  ">These are all User's Post</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg-p-20">
            {posts.map((post) => (
              <div key={post.id} className="border-2 border-red-400 py-10 px-5">
                <p className="underline mb-3"><strong>PostId</strong> {post.id}</p>
                 <h6 className="mb-2"><strong> Name:</strong><div>{post.user.firstName} {post.user.lastName}</div></h6>
                 <h6 className="mb-2"><strong>UserId:</strong><div>{post.userId}</div></h6>
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

      <div>
        <div className="flex justify-center mt-5 font-serif font-semibold p-10 lg:p-5">
        <h1 className=" text-gray-200 text-4xl "> These all are the User's Album</h1>
        </div>
      <div>
    {loading?(
      <Loading />
    ):(
    <main className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-8 lg:p-20">
      {albums.map((album) => (
        <div key={album.id} className="border-2 border-red-400 py-8 px-5">
          <p className="flex justify-between text-xl"><strong >AlbumId:  {album.id}</strong></p>
          <p className="text-xl mb-3"><strong>Name:</strong> {album.title}</p>

          <div className='flex flex-col lg:flex-row justify-between gap-3 w-full '>
                
                <Link
                href={`/Api/Albums/Edit/${album.id}`}>
                <Button
                  type="submit"
                  title=""
                  icon={<Edit />}
                  variant="btn_blue1"
                />
                </Link> 

                <Button
                  type="submit"
                  title=""
                  icon={<Delete />}
                  variant="btn_red1"
                  onClick={() => handleDelete1(album.id)}
                />

                 <Link href={`/Api/Photos/Fetch/${album.id}`} > 
                  <Button
                    type="submit"
                    title=""
                    icon={<Photo />}
                    variant="btn_green1"
                    
                  />
                 </Link> 
              </div>
        </div>
      ))}
    </main>
    )}
    </div>

      </div>
    </div>
  );
};

export default Admin;
