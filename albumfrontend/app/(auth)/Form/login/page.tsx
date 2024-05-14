"use client"


import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Loading from '@/Components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  // const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();


  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email, password }),
        
      }
    );
      
      setLoading(false)
      if (response.ok) {
        const data = await response.json();
        
        const token = data.token;
        const isAdmin = data.user.role === 'ADMIN';
        // console.log(token)
        // console.log('isAdmin:', isAdmin);
        // Store token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin.toString());

        // Fetch user's posts using the token
        
         
         

        if(isAdmin){   
          toast.success("Login successfully!");       
        router.push('Api/AdminDashboard')
          setLoading(true)
        }else{
          toast.success("Login successfully!",
          {
            theme: "colored"
          }
          );  
         router.push('Api/Locate')
        }
      } else {
        toast.error("Invalid email or password",
        {
          theme: "colored"
        }
        );
        setError('Invalid email or password');
        setLoading(false)
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Something went wrong');
     
    }finally {
      setLoading(false); // Set loading to false after the request completes or an error occurs
    }
    
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col 
    justify-center py-12 sm:px-6 lg:px-8
    bg-[url('/passwordbg.jpg')] bg-cover bg-center ">
       {loading ? (
      <Loading />
      ) : (
      <div className="sm:mx-auto sm:w-full sm:max-w-md   bg-[url('/passwordbg.jpg')] 
      bg-cover bg-center bg-opacity-30 p-10 rounded-xl">
          <ToastContainer/> 
        <h2 className="text-center text-3xl font-extrabold text-gray-200">Sign in to your account</h2>
    

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-lg font-serif  text-gray-200">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 text-white border-b-2 rounded-md shadow-sm
                   placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                   sm:text-sm bg-transparent text-2xl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-serif  text-gray-200">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="  px-3 py-2 border-b-2 bg-transparent text-white text-2xl  
                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                   focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/Form/ForgotPassword" className="font-medium text-gray-300 hover:text-gray-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="flex justify-end font-medium text-gray-300 hover:text-gray-400">
              <Link href="/Form/Registration">Don't have an account?</Link>
            </div>
          </form>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default LoginForm;
