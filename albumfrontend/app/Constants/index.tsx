import { Comment, Home, Logout, Pages, Person2, PhotoLibrary } from "@mui/icons-material";

// Define navigation links and corresponding icons
export const NAV_LINKS = [
  { href: `/Api/Feed/`, key: 'home', label: 'Home', icon: <Home />,  },
  { href: '/Api/Posts/Fetch', key: 'posts', label: 'posts', icon: <Pages/> },
  { href: '/Api/Albums/Fetch', key: 'comments', label: 'Album', icon: <PhotoLibrary /> },
  { href: '/Api/Locate', key: 'profile', label: 'Profile', icon: <Person2 /> },
  
];
