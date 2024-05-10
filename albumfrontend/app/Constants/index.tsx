import { Comment, Home, Logout, Pages, PhotoLibrary } from "@mui/icons-material";

// Define navigation links and corresponding icons
export const NAV_LINKS = [
  { href: '/Api/Locate', key: 'home', label: 'Home', icon: <Home /> },
  { href: '/Api/Posts/Fetch', key: 'posts', label: 'posts', icon: <Pages/> },
  { href: '/Api/Albums/Fetch', key: 'comments', label: 'Album', icon: <PhotoLibrary /> },
  {
    href: '/',
    key: 'logout',
    label: 'Logout',
    // Wrap the Logout icon in a span and apply a custom class for styling
    icon: <span className="bg-red-500"><Logout /></span>
  },
];
