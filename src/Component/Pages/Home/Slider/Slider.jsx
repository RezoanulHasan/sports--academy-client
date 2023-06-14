import React from 'react';

const Slider = () => {
    return (
<div className='m-'>
<div>
  <div className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full">
      <img  className="   object-cover w-full h-full " src= "https://images.unsplash.com/photo-1521504846809-c3746c1fbf67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide4" className="btn btn-circle">❮</a> 
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>

      
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-lg  text-sm  text-center font-bold">
  <h3 className="text-center   text-2xl "> OUR MISSION</h3>
  <p className="lg:mt-20 mt-4 bg-slate-500">Empowering athletes to reach their full potential through comprehensive training programs and personalized guidance.</p>
</div>


     
    </div> 
    <div id="slide2" className="carousel-item relative w-full">
      <img  className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1577224682124-f87b20de2bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60 "  />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" className="btn btn-circle">❮</a> 
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
   

<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-lg  text-sm  text-center font-bold">
  <h3 className="text-center text-red-200  text-2xl "> OUR VISION</h3>
  <p className="lg:mt-20 mt-4  text-black bg-red-200">Becoming a leading Sports Academy that fosters excellence, inspires passion, and cultivates champions in every athlete.</p>
</div>
  
      
    </div> 
    <div id="slide3" className="carousel-item relative w-full">
      <img className="object-cover w-full h-full"  src="https://images.unsplash.com/photo-1617623504859-5d0603345834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide2" className="btn btn-circle">❮</a> 
        <a href="#slide4" className="btn btn-circle">❯</a>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-lg  text-sm  text-center font-bold">
  <h3 className="text-center text-orange-700  text-2xl "> OUR HISTORY</h3>
  <p className="lg:mt-20 mt-4  text-black bg-orange-300">Established in.. our Sports Academy has been a trusted destination for athletes seeking top-notch training and professional development.</p>
</div>
    </div> 
    <div id="slide4" className="carousel-item relative w-full">
      <img  className=" object-cover w-full h-full " src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"  />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" className="btn btn-circle">❮</a> 
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-lg  text-sm  text-center font-bold">
  <h3 className="text-center text-2xl ">Customer Service</h3>
  <p className="lg:mt-20 mt-4  text-black bg-green-200">Delivering exceptional customer service with a dedicated team that ensures athletes' needs are met promptly and their experience is nothing short of excellence.</p>
</div>
    </div>
  </div>
</div>

</div>

    );
};

export default Slider;