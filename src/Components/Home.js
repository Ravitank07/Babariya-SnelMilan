import React from 'react';
import { FaUserTag } from "react-icons/fa";
import BreadCrumb from './Modal/BreadCrumb'
import { BsFillPersonLinesFill } from "react-icons/bs";

import { HiUserGroup } from "react-icons/hi2";
import './Home.css'
const Home = () => {

  return (
    <>
      <div className='pt-[6rem] px-5 h-screen overflow-auto'>
        <BreadCrumb />
        <div className='flex mt-5'>
          <div className='w-[20rem] bg-blue-500 h-[8rem] box-1 mr-5 p-4 flex justify-between items-center'>
            <div className=''>
              <h1 className='my-4 text-[1.3rem]'>Total Member's</h1>
              <h1 className='my-4 text-[1.2rem]'>12000</h1>
            </div>
            <div>
              <BsFillPersonLinesFill className='text-[4rem]' />
            </div>
          </div>
          <div className='w-[20rem] h-[8rem] box-2 mr-5 p-4 flex justify-between items-center'>
            <div className=''>
              <h1 className='my-4 text-[1.3rem]'>Committee Member's</h1>
              <h1 className='my-4 text-[1.2rem]'>12000</h1>
            </div>
            <div>
              <HiUserGroup className='text-[4rem]' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
