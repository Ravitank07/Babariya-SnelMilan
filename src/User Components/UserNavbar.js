import React from 'react';
import { RiMenuUnfoldLine } from "react-icons/ri";
import { BsPersonVcardFill } from "react-icons/bs";
import { FaUserLargeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoNotificationsSharp } from "react-icons/io5";
import './Navbar.css';

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/')
  }
  return (
    <nav className={`navbar fixed top-0 left-0 text-black pr-10 pl-4 py-2 z-10 duration-500 h-20 ${open ? 'ml-[22rem]' : 'ml-[6rem]'} w-full flex items-center justify-between`}>
      <RiMenuUnfoldLine
        className={`text-black text-[2rem] absolute top-[1.4rem] cursor-pointer ${open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className={`flex items-center ml-auto ${open ? 'mr-[22rem]' : 'mr-[6rem]'}`}>
        <BsPersonVcardFill className='mx-2 text-2xl' />
        <IoNotificationsSharp className='mx-2 text-2xl' />
        <FaUserLargeSlash className='mx-2 text-2xl' onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
