import React from 'react';
import { Fade } from "react-awesome-reveal";
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';
import  campion from "../../../../assets/campion.json"
import  dolna from "../../../../assets/dolna.json"
import GetRandomColor from '../../../Shared/GetRandomColor/GetRandomColor';

const Banner = () => {
   const textColor = GetRandomColor();
    return (
        <div>
    
   
           <div className="relative h-screen mb-10">         
           <div className="absolute inset-0 "></div>
      <div className='m-6 flex absolute  space-between  items-center justify-center  gap-5' >
<div className= 'w-1/2  '  >
<Fade direction="right" >  
        <h1 className="text-4xl text-black md:text-6xl font-bold mb-4 mx-4">Wel  <span className='text-red-700'>COME</span> <br /> to <br /><span className='text-red-700'>  !Sports  </span> Aca   <span className='text-red-700' >demy</span></h1></Fade>
    
        
        <Lottie  className='h-40'      animationData={dolna} loop={true} />

        <Fade direction="left">  <h1 className='  text-black'>Unlock your full potential at our state-of-the-art sports academy, where champions are made and dreams come true."
"Join our elite sports academy and embark on a journey of excellence, where passion and dedication meet triumph."</h1> </Fade>
        </div>    
        <div className="w-1/2  justify-end">
        <Fade direction="up" > 
        <Lottie  className='justify-end'      animationData={campion} loop={true} />
        </Fade>
        </div>
      </div>
  </div>
  <h1  style={{ color: textColor }}className='mb-20 font-bold mt-20  font-sans text-3xl  text-center  border-x-4 border-indigo-500 '> Our   Popular Instructors  </h1>
        </div>
    );
};

export default Banner;