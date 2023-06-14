import React, { useEffect } from 'react';
import GetRandomColor from './../../../Shared/GetRandomColor/GetRandomColor';
import AOS from 'aos';
import 'aos/dist/aos.css';
const AboutUs = () => {
  const textColor = GetRandomColor();
  useEffect(() => {
   
    AOS.init({ once: true, mirror: true }); // Enable AOS reverse option
  }, []);


    return (
        <div className='m-10 mb-20'>

<h1  style={{ color: textColor }}className='mb-20 font-bold mt-20   font-sans text-3xl  text-center  border-x-4 border-indigo-500 '>About US </h1>
<div className="bg-cover  shadow  bg-center bg-fixed" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)'}}> 
<div className="grid lg:grid-cols-5 grid-cols gap-10 py-5 px-10">
        <div
          className="relative h-40 w-52 bg-emerald-500 rounded-3xl p-5 transition duration-500 ease-in-out transform hover:rotate-90"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxyOwKeSMkcdUGLdxexjlKoXLUK8tCeti_Q&usqp=CAU" alt="" className="mx-auto mb-2" />
          <h3 className="text-4xl font-bold mb-2">100 +</h3>
          <p className="text-lg font-medium">Award winnings</p>
        </div>
        <div
          className="relative h-40 w-52 bg-pink-200 rounded-3xl p-5 transition duration-500 ease-in-out transform hover:rotate-90"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qNsyPh4qMvp8LgfEBo0kgjToHV8534yOew&usqp=CAU" alt="" className="mx-auto mb-2" />
          <h3 className="text-4xl font-bold mb-2">50y +</h3>
          <p className="text-lg font-medium">Experiences</p>
        </div>
        <div
          className="relative h-40 w-52 bg-emerald-500 rounded-3xl p-5 transition duration-500 ease-in-out transform hover:rotate-90"
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETROUrxj5jvBMzpm61_UQwgoxXjUl6AikwjzW6fdkqYI_pczIUKjUNBhsbrFzh6NmNqU&usqp=CAU" alt="" className="mx-auto mb-2" />
          <h3 className="text-4xl font-bold mb-2">100 +</h3>
          <p className="text-lg font-medium">Country connect</p>
        </div>
        <div
          className="relative h-40 w-52 bg-pink-200 rounded-3xl p-5 transition duration-500 ease-in-out transform hover:rotate-90"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTuScQM4rR3rManUFTrgUoZV5-3I0Z8cNVEw&usqp=CAU" alt="" className="mx-auto mb-2" />
          <h3 className="text-4xl font-bold mb-2">1000K +</h3>
          <p className="text-lg font-medium">Customer connect</p>
        </div>
        <div
          className="relative h-40 w-52 bg-emerald-500 rounded-3xl p-5 transition duration-500 ease-in-out transform hover:rotate-90"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvgIDbIXMSYct_zLqVawggsBGFBbsy5ukaOU8dI1DySYhJh3ty3JX_1XR0bFpiT3EToE&usqp=CAU" alt="" className="mx-auto mb-2" />
          <h3 className="text-4xl font-bold mb-2">24hr +</h3>
          <p className="text-lg font-medium">Available</p>
        </div>
      </div>
      </div>


        </div>
    );
};

export default AboutUs;