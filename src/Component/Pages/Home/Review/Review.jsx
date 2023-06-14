import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import GetRandomColor from './../../../Shared/GetRandomColor/GetRandomColor';

const Review = () => {
  useEffect(() => {
    AOS.init({ once: true, mirror: true }); // Enable AOS reverse option
  }, []);

  const textColor = GetRandomColor();

    return (

      <>
     
<div className="m-10">

<br />

<h1  style={{ color: textColor }}className='mb-20 font-bold mt-20  font-sans text-3xl  text-center  border-x-4 border-indigo-500 '> CUSTOMER-REVIEW  </h1>

  <div className="bg-cover  shadow  bg-center bg-fixed" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)'}}> 
  <div className="gap-10 grid grid-cols lg:grid-cols-4 md:grid-cols-2 ">
     
  <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="card w-full bg-red-400 shadow-2xl"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        {/* Content */}
        <figure>
    <img className='object-cover w-60 h-60 lg:h-full md:h-full mb-6 rounded shadow-lg xl:h-80' src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="man" />
        </figure>
  <div className="card-body">
    <h2 className="card-title">
      <div className="badge badge-secondary">Riya</div>
    </h2>
    <p className='text-white'>"Spot's Academic website has exceeded my expectations with its diverse range of high-quality educational content, making it an invaluable tool for students of all levels.</p>
   
  </div>
      </motion.div>



      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="card w-full bg-blue-500 shadow-2xl"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        {/* Content */}
        <figure>
    <img className='object-cover w-60 h-60 lg:h-full md:h-full mb-6 rounded shadow-lg xl:h-80' src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"alt="man" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      <div className="badge badge-secondary">Riad</div>
    </h2>
    <p className='text-white'>"I highly recommend Spot's Academic website to anyone seeking a reliable and user-friendly platform for research and study materials; it has become my go-to resource for academic success."</p>
    <div className="card-actions justify-end">
   
    </div>
  </div>

      </motion.div>

      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="card w-full bg-emerald-500 shadow-2xl"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        {/* Content */}
        <figure>
    <img className='object-cover w-60 h-60 lg:h-full md:h-full mb-6 rounded shadow-lg xl:h-80' src="https://cdn.stocksnap.io/img-thumbs/280h/6QXAIH13O6.jpg" alt="man" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      <div className="badge badge-secondary">Hasan</div>
    </h2>
    <p className='text-white'>"Spot's Academic website is a game-changer for students, providing a wealth of well-organized and up-to-date information that has significantly improved my academic performance.</p>
    
  </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="card w-full bg-yellow-600 shadow-2xl"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        {/* Content */}
        <figure>
    <img className='object-cover w-60 h-60 lg:h-full md:h-full mb-6 rounded shadow-lg xl:h-80' src="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="man" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      <div className="badge badge-secondary">Rezoanul</div>
    </h2>
    <p className='text-white'>"Using Spot's Academic website has been a breath of fresh air; its intuitive interface, interactive features, and vast array of resources have revolutionized the way I approach my studies</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
      </motion.div>

    </div>

        </div>
        </div>
       </>
    );
};

export default Review;