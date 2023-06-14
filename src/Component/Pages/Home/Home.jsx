import React, { useState } from 'react';
import Contact from './Contact/Contact';
import Review from './Review/Review';
import AboutUs from './AboutUs/Aboutus';
import Slider from './Slider/Slider';
import Banner from './Banner/Banner';

import PopularInstroctor from './PopularInstroctor/PopularInstroctor';
import Sixclass from './Sixclass/Sixclass';


const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const handleCheckboxChange = () => {
    setDarkMode(!darkMode);
  };
    return (
        <div  className='overflow-hidden'>

<div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="form-control   ">
        <label className="label cursor-pointer   ">
          <span className="label-text"></span>
          <input
            type="checkbox"
            className="toggle   toggle-info"
            style={{ border: "2px solid black" }}
            checked={darkMode}
            onChange={handleCheckboxChange}
          />
        </label>
      <Banner></Banner>
      
      <PopularInstroctor></PopularInstroctor>
      <Sixclass></Sixclass>
    <Slider></Slider>
      <AboutUs></AboutUs>
<Review></Review>
<Contact></Contact>

</div></div>

</div>
      
    );
};

export default Home;