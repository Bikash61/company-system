import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-2xl font-bold">Aus-Tech</h2>
            <p className="text-gray-400">
              Building the future, one line of code at a time.
            </p>
            <div className="flex space-x-6">
              {/* Add social media links here */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/portfolio" className="text-base text-gray-400 hover:text-white">Our Work</Link></li>
                  {/* Add more links as needed */}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/contact" className="text-base text-gray-400 hover:text-white">Contact Us</Link></li>
                   {/* Add more links as needed */}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/blog" className="text-base text-gray-400 hover:text-white">Blog</Link></li>
                   {/* Add more links as needed */}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-gray-400 hover:text-white">Privacy</Link></li>
                  <li><Link href="#" className="text-base text-gray-400 hover:text-white">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} Aus-Tech. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
