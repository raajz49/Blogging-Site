import React from 'react'
import Link from 'next/link'
import { PersonOutline, PhotoLibrary } from '@mui/icons-material'
const Home = () => {
  return (
    <div className='flex flex-row justify-center items-center h-screen gap-10'>
      <div>
      <Link href={`/Api/Users/Fetch`}>
          <PersonOutline
          className='text-8xl text-blue-500' /> 
         <p className='ml-6'>Users</p> 
      </Link>
    </div>
    <div >
    <Link href={`/Api/Albums/Fetch`}>
          <PhotoLibrary
          className='text-8xl text-blue-500' />
          <p className='ml-6'>Album</p>
      </Link>
    </div>
    </div>
  )
}

export default Home
