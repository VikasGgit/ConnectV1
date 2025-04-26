import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Grid from '../assets/grid.png';
const Maincontainer = () => {
  console.log("main-container re-render");
  return(
      <div className='main-container flex flex-col h-screen min-h-screen justify-around items-center bg-[#f4f5f8] overflow-auto relative'>
        <Outlet/>
      </div>
  )
}
export default Maincontainer;