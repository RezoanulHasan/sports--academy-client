
import React from 'react';
import useTitle from '../../../hooks/useTitle';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
import { useState } from 'react';
import { FaUserTie,FaQrcode } from 'react-icons/fa';
import GetRandomColor from '../../Shared/GetRandomColor/GetRandomColor';


const AllClass = () => {

  const textColor = GetRandomColor();
  const Classes = useLoaderData();
  const approvedClasses = Classes.filter((Class) => Class.status === 'Approved');

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const { user } = useAuth();

  useTitle('AllClass');

  return (
<>
<h1  style={{ color: textColor }}className='mb-20 font-bold mt-10 m-5 font-sans text-3xl  text-center  border-x-4 border-indigo-500 '>OUR COURSES-{Classes.length}    </h1>
      
    <div className='  m-5 grid grid-cols-1 lg:grid-cols-3'>
      {approvedClasses.map((Class) => (
        <Card key={Class._id} Class={Class} user={user} isAdmin={isAdmin} isInstructor={isInstructor} />
      ))}
    </div>
    </>
  );
};

const Card = ({ Class, user, isAdmin, isInstructor }) => {
  const [selected, setSelected] = useState(false);

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

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = () => {
    if (selected ||seats === 0 || isAdmin || isInstructor) {
      return; // Disable select button for seats = 0, admin, or instructor
    }
    setSelected(true); // Mark the button as selected


    if (user && user.email) {
      const cartItem = {
        classId: _id,
        className,
        seats,
        price,
        instructorName,
        classPhoto,
        category,
        details,
        instructorPhoto,

        email: user.email,
        status: 'chose', // Set the initial status as 'pending'
      };

      fetch('https://sports-academy-two.vercel.app/carts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            // refetch(); // Uncomment this line if you have a refetch function to update the cart
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '  class added to the cart.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Please log in to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }

    // Perform course selection logic here
    console.log(`Selected class: ${className}`);
  };




  return (

    <>

    <div className={`m-10 ${seats === 0 ? 'bg-red-300' : ''}`}>
      <div className='card card-compact w-full h-full bg-base-100 shadow-xl'>
        <figure>
          <img
            className='object-cover w-full mb-6 rounded shadow-lg md:h-64 xl:h-80'
            src={classPhoto}
            alt='image'
          />
        </figure>
        <div className='card-body w-full  '>
          <h2 className='card-title'><FaUserTie></FaUserTie>  Instructor: {instructorName}</h2>
          <h2 className='card-title'>< FaQrcode></FaQrcode> Category: {category}</h2>
          <div className=' flex justify-between'>
            <div className='badge badge-info'>Course: {className}</div>
            <div className='badge badge-primary'>  Seats:{seats}   </div>

            <div className='badge badge-error'>Price: {price}$</div>

          

 


          </div>
     
       
         
        
          <div className='card-actions justify-end'>

          <p>{details}</p>
            <button
              className='btn btn-primary'
              onClick={handleSelect}
              disabled={selected ||seats === 0 || isAdmin || isInstructor}
            >
              Select
            </button>
        
          </div>
        </div>
      </div>
    </div>
  
    

    </>
  );
};

export default AllClass;
