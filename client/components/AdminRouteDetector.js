'use client';
import { usePathname } from 'next/navigation';
import AdminNavbar from './AdminNavbar';
import Navbar from './Navbar';
import Footer from './Footer';


export default function AdminRouteDetector({children}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  return(
    <>
      {!isAdmin ?  <Navbar />: ''}
        {children}
      {!isAdmin ? <Footer/>: ''}
    </>
    )

  }
