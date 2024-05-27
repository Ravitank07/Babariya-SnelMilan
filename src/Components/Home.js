import React from 'react';
import { FaUserTag } from "react-icons/fa";
import './Home.css'
const Home = () => {
  return (
    <>
      <div className='flex justify-start'>
        <div className='main-box'>
          <div className='box-1'>
            <h1>Today's User</h1>
            <h2>53,000</h2>
          </div>
          <div className='box-2'>
            <FaUserTag />
          </div>
        </div>
        <div className='main-box'>
          <div className='box-1'>
            <h1>Today's User</h1>
            <h2>53,000</h2>
          </div>
          <div className='box-2'>
            <FaUserTag />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
