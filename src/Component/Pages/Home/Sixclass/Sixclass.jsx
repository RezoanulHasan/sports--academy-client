import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import GetRandomColor from '../../../Shared/GetRandomColor/GetRandomColor';
import { FaUserTie,FaQrcode } from 'react-icons/fa';
import { motion } from "framer-motion";

const Sixclass = () => {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const textColor = GetRandomColor(); 

  useEffect(() => {
    fetch('https://sports-academy-two.vercel.app/classes')
      .then(response => response.json())
      .then(data => {
        const filteredClasses = data.filter(Class =>
          [
            '6480951326f80384f9a9d28c',
            '648398d105379befbc85e79d',
            '6483901005379befbc85e794',
            '6480949f26f80384f9a9d28b',
            '6484d290d738245284de9485',
            '64839b8805379befbc85e79f'
          ].includes(Class._id)
        );
        setApprovedClasses(filteredClasses);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>

<div>
  <h1  style={{ color: textColor }}className='mb-20 font-bold mt-20  font-sans text-3xl  text-center  border-x-4 border-indigo-500 '> Our   Popular Classes  </h1>
        </div>

    <div className='grid grid-cols-1 lg:grid-cols-3'>
      {approvedClasses.map(Class => (
        <Card key={Class._id} Class={Class} />
      ))}
    </div>


        </>

        );   
};

const Card = ({ Class }) => {

  

  const {
    _id,
    className,
    seats,
    price,
    instructorName,
    classPhoto,
    category,
    details,
    instructorPhoto,
    email,
    status
  } = Class;

  return (

    <>



 <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
     className='m-10    mt-10 mb-10'>

<div className='card card-compact w-full h-full bg-blue-100 shadow-xl'>
        <figure>
          <img
            className='object-cover w-full mb-6 rounded shadow-lg md:h-64 xl:h-80'
            src={classPhoto}
            alt='image'
          />
        </figure>
        <div className='card-body w-full'>
        <h2 className='card-title text-black'><FaUserTie></FaUserTie>  Instructor: {instructorName}</h2>
          <h2 className='card-title   text-black'>< FaQrcode></FaQrcode> Category: {category}</h2>
        
          <div className='flex justify-between'>
            <div className='badge badge-info'>Course: {className}</div>
            <div className='badge badge-primary'>Seats: {seats}</div>
            <div className='badge badge-error'>Price: {price}$</div>
          </div>
          <div className='card-actions justify-end'>
            <p  className='text-black'>  {details}</p>
          </div>
        </div>
      </div>

    </motion.div>
  
      </>
  );
};

export default Sixclass;
