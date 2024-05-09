import { Comment, Home, Logout, Pages } from "@mui/icons-material";

// Define navigation links and corresponding icons
export const NAV_LINKS = [
  { href: '/Api/Comments/Fetch/{params}', key: 'home', label: 'Home', icon: <Home /> },
  { href: '/', key: 'posts', label: 'posts', icon: <Pages/> },
  { href: '/', key: 'comments', label: 'comments', icon: <Comment /> },
  {
    href: '/',
    key: 'logout',
    label: 'Logout',
    // Wrap the Logout icon in a span and apply a custom class for styling
    icon: <span className="bg-red-500"><Logout /></span>
  },
];
