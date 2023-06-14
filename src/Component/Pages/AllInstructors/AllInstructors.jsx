import React from 'react';
import useTitle from '../../../hooks/useTitle';
import { useLoaderData } from 'react-router-dom';
import GetRandomColor from '../../Shared/GetRandomColor/GetRandomColor';
import { FaUserTie,FaEnvelope } from 'react-icons/fa';


const AllInstructors = () => {
  useTitle('AllInstructors');
  const textColor = GetRandomColor(); 
  const Classes = useLoaderData();

  const uniqueEmails = new Set();
  let instructorCount = 0;
  return (
<>
<h1  style={{ color: textColor }}className='mb-20 font-bold mt-10 m-5 font-sans text-3xl  text-center  border-x-4 border-indigo-500 '>OUR INSTRUCTOR</h1>
    <div className="m-5 grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1  gap-5">
      {Classes.map((Class) => {
        const { _id, className, seats, price, instructorName, classPhoto, category, details, photo, instructorPhoto, email, status } = Class;

        if (!uniqueEmails.has(email)) {
          uniqueEmails.add(email);
          instructorCount++;

          return (
            <div key={_id}>
              <h2>Email: {email}</h2>
              <Card Class={Class} />
            </div>
          );
        }

        return null;
      })}
</div>
</>
  );
};

const Card = ({ Class }) => {
  const { _id, className, seats, price, instructorName, classPhoto, category, details, photo, instructorPhoto, email, status } = Class;

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-54 xl:h-84" src={instructorPhoto} alt="image" />
      </figure>
      <div className="card-body text-bold">
        <h2 className="card-title"><FaUserTie></FaUserTie>  Name: {instructorName}</h2>
        </div>
        <p  className='flex font-bold card-title '> <FaEnvelope></FaEnvelope>  Email: {email}</p>
       
    
    </div>
  );
};

export default AllInstructors;