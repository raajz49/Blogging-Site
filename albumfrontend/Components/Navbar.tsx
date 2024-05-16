"use client"

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NAV_LINKS } from '@/app/Constants';
import Link from "next/link"
import Button from './Button';
import { Logout } from '@mui/icons-material';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router =useRouter();
  const handleLogout = () => {
    // Display a confirmation toast message when the logout button is clicked
    toast.info(
      <div>
        <p>Are you sure you want to logout?</p>
        <div className='flex ml-10 justify-start gap-24'>
          <button onClick={confirmLogout} style={{ marginRight: '10px' }}>Yes</button>
          <button onClick={toastdismiss}>No</button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: true,
      }
    );
  };

  const confirmLogout = () => {
    // Perform logout action here
    router.push('/')
    console.log('Logout action performed');
    // Dismiss the toast after confirming logout
    toast.dismiss();
  };
  const toastdismiss= () => {
    // Perform logout action here
    console.log('Logout action performed');
    // Dismiss the toast after confirming logout
    toast.dismiss();
  };
  return (
    <nav className="flex sticky z-10 top-0 bg-blue-400 justify-between items-center padding-container px-10 py-2 bg-opacity-25 bg-cover bg-center">
      <ToastContainer/> 
     
      <Link href="/">
        <p className='text-[30px] mt-[-16px] ml-20 font-serif font-bold text-amber-700'>RAJ</p>
      </Link>
        
      <ul className="space-x-20 flex flex-row mx-[10rem]">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href}
              className="text-xl font-sans text-gray-100 
              flex flex-col items-center cursor-pointer transition-all font-light hover:font-normal mr-3">
                {link.icon}
                <span>
                  <p className='text-[20px] '>{link.label}</p>
                </span>
            </Link>
          </li>
        ))}
        <Button
          type='button'
          title='Logout'
          icon={<Logout />}
          variant="btn_logout"
          onClick={handleLogout}
        /> 
      </ul>
    </nav>
  );
};

export default Navbar;
