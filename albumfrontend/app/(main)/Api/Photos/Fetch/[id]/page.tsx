"use client"
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { Add, Delete } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Photo {
    id: number;
    title: string;
    photograph: string;
}

interface Params {
    id: string;
}

const FetchPhoto = ({ params }: { params: Params }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [error, setError] = useState<string | number | null>(null);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                setLoading(true)
                const response = await fetch(`http://localhost:3001/photos/albums/${params.id}`);
                if (!response.ok) {
                    throw new Error("URL not working");
                }
                const data = await response.json();
                setPhotos(data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError("Failed to load");
            }
        };
        fetchPhoto();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            await fetch(`http://localhost:3001/photos/${id}`, {
                method: "DELETE",
            });
            setPhotos((prevData) => prevData.filter((photo) => photo.id !== id));
        } catch (error) {
            setError("Failed to delete photo. Please try again.");
            console.error("Failed to delete photo. Please try again.", error);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/bg-img1.avif')] bg-cover bg-center">
            <div className="p-8 flex justify-end">
                <Link href={`/Api/Photos/Create/${params.id}`} className="flex p-2 w-48 justify-end items-center ">
                    <Button type="submit" title="Create Photo" icon={<Add />} variant="btn_green" />
                </Link>
            </div>
            <div>
                {loading? (
                    <Loading />
                ):(
                    <div> 
            {photos?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg:p-20 mt-[-5rem]">
                    {photos.map((photo) => (
                        <div key={photo.id} className="py-10 px-5 bg-white bg-[url('/bg-img1.avif')]  bg-opacity-10 rounded-lg">
                <div>
                <Image
              src={photo.photograph}
              height="500"
              width="400"
              alt="GFG logo served from external URL"
              className="rounded-full h-16 w-16 object-cover object-center"
            />

                </div>
                            <p className="underline mb-3">
                                <strong>Id</strong> {photo.id}
                            </p>
                            <h6>
                                <strong>Title</strong>
                                <div className="mb-3">{photo.title}</div>
                            </h6>
                            <div>
                                <Image
                                    src={photo.photograph}
                                    height={100}
                                    width={300}
                                    alt="Dummy Image"
                                    className="rounded-xl h-[22rem] object-cover object-center"
                                />
                            </div>
                            <div className="rounded-xl p-1 px-2">
                                <Button
                                    type="button"
                                    title="Delete"
                                    icon={<Delete />}
                                    variant="btn_red"
                                    onClick={() => handleDelete(photo.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-500 font-serif font-bold text-3xl flex justify-center items-center mt-32">No photos available</p>
            )}
            </div>
        )}
        </div>
        </div>
    );
};

export default FetchPhoto;
