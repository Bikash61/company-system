'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Aus-Tech</Link>
        <div className="space-x-4">
          <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
          <Link href="/blog" className="hover:text-gray-300">Blog</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link href="/admin/blog" className="hover:text-gray-300">Admin</Link>
              <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
              <Link href="/auth/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
