import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import { FaUserTie,FaEnvelope, FaQrcode} from 'react-icons/fa';
const PopularInstroctor = () => {


  const [classes, setClasses] = useState([]);
  const uniqueEmails = new Set();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sports-academy-two.vercel.app/classes');
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (

    <>
     
  
  
    <div className="m-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
      {classes.slice(0, 12).map((classItem) => {
        const { _id, className, seats, price, instructorName, classPhoto, category, details, photo, instructorPhoto, email, status } = classItem;

        if (!uniqueEmails.has(email)) {
          uniqueEmails.add(email);

          return (
            <div key={_id}>
              <h2>Email: {email}</h2>
              <Card classItem={classItem} />
            </div>
          );
        }

        return null;
      })}
    </div>



    </>
  );
};

const Card = ({ classItem }) => {
  const { _id, className, seats, price, instructorName, classPhoto, category, details, photo, instructorPhoto, email, status } = classItem;

  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
    className="card w-full bg-red-400 shadow-2xl">

    <div className="card card-compact  bg-red-200   shadow-2xl">
      <figure>
        <img className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-54 xl:h-84" src={instructorPhoto} alt="image" />
      </figure>
      <div className="card-body text-center text-bold">
        <h2 className="card-title"><FaUserTie></FaUserTie> Name: {instructorName}</h2>
        <h2 className="card-title">< FaQrcode></FaQrcode>Course Name: {className}</h2>
        <p  className=' card-title '>  <FaEnvelope></FaEnvelope> Email: {email}</p>

        <div className="card-actions justify-end">
          {/* Additional card actions */}
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default PopularInstroctor;

