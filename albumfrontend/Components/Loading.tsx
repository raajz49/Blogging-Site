import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-50">
      <div className="w-24 h-24  flex justify-center items-center bg-gray-500 bg-opacity-75 rounded-md">
        <Loader className="animate-spin text-white w-12 h-12" />
      </div>
    </div>
  );
}
