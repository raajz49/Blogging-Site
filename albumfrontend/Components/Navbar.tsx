import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NAV_LINKS } from '@/app/Constants';
import Link from "next/link"




const Navbar = () => {
  return (
    <nav className="flex sticky z-10  top-0 bg-gray-400  justify-between items-center  padding-container  px-10 py-2 ">
      <Link href="/">
       <p className='text-[30px] mt-[-16px] ml-20   text-blue-700'>rAJ</p>
         </Link>
        
         <ul className="space-x-20 flex flex-row mx-[10rem] ">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href}
              className="text-xl font-sans  text-gray-800 
              flex flex-col items-center cursor-pointer transition-all font-light hover:font-normal mr-3">
                {link.icon}
                <span>
                    <p className='text-[20px] '>{link.label}</p>
                    
                    </span>
              
            </Link>
          </li>
        ))}
      </ul>
       
    </nav>
  )
}

export default Navbar