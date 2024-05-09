// Remove import type { Metadata } from "next";
// Remove "./globals.css";

import Navbar from "@/Components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className='relative overflow-hidden'>
        {children}
      </main>
    </>
  );
}
