import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NAV_LINKS } from '@/app/Constants';
import Link from "next/link"




const Navbar = () => {
  return (
    <nav className="flex sticky z-10  top-0 bg-blue-400  justify-between items-center  padding-container  px-10 py-2 bg-opacity-25 bg-cover bg-center ">
      <Link href="/">
       <p className='text-[30px] mt-[-16px] ml-20 font-serif font-bold  text-amber-700'>RAJ</p>
         </Link>
        
         <ul className="space-x-20 flex flex-row mx-[10rem] ">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link href={link.href}
              className="text-xl font-sans  text-gray-100 
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