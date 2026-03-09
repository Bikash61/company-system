import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">[Your Agency]</a>
        <div className="space-x-4">
          <a href="/services" className="hover:text-gray-300">Services</a>
          <a href="/portfolio" className="hover:text-gray-300">Portfolio</a>
          <a href="/blog" className="hover:text-gray-300">Blog</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
