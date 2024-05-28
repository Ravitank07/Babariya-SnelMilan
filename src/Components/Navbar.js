import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import './Navbar.css';
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Navbar = ({ open, visible }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (!visible) return null; // Don't render the Navbar if it's not visible

  return (
    <>
      <nav className={`navbar fixed top-0 left-0 text-black px-4 py-2 z-50 duration-500 h-20 ${open ? 'ml-[16rem]' : 'ml-[6rem]'} w-full flex items-center justify-between`}>
        <div className="breadcrumb text-black">
          {pathnames.length > 0 && pathnames[0] !== "" && ( // Conditionally render Home link
            <Link to="/home" className="text-black hover:underline">
              <IoHome className='text-2xl' />
            </Link>
          )}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            if (value.toLowerCase() === 'utility') {
              return (
                <span key={to}>
                  <span className="mx-2">/</span>
                  <Link to={to} className="text-black hover:underline">
                    Utility
                  </Link>
                </span>
              );
            }
            return (
              <span key={to} className='text-2xl'>
                <span className="mx-2">/</span>
                {isLast ? (
                  <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                ) : (
                  <Link to={to} className="text-black hover:underline">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
