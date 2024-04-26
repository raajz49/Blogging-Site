import React from 'react'
import Link from 'next/link'
const Home = () => {
  return (
    <div className='flex flex-row justify-center items-center h-screen gap-10'>
      <div>
      <Link href={`/Components/FetchUsers`}>
          Users
      </Link>
    </div>
    <div>
    <Link href={`/Components/FetchAlbums`}>
          Album
      </Link>
    </div>
    </div>
  )
}

export default Home
