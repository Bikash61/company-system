import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">[Your Agency]</Link>
        <div className="space-x-4">
          <Link href="/services" className="hover:text-gray-300">Services</Link>
          <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
          <Link href="/blog" className="hover:text-gray-300">Blog</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          <Link href="/auth/login" className="hover:text-gray-300">Login</Link>
          <Link href="/auth/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
