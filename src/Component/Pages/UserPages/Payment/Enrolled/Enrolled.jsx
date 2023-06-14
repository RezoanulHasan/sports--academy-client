import React from 'react';
import usePayment from '../../../../../Hooks/usePayment';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../../../hooks/useTitle';


const Enrolled = () => {
  const [cart, refetch] = usePayment();
  const navigate = useNavigate();
  const back = () => {
      navigate(-1);
    }
  useTitle("Enroll class")
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 m-10 gap-5'>
      {cart.map(item => (
        <div key={item.id} className="card w-full h-full bg-base-100 shadow-xl">
          <figure>
          <img
            className='object-cover w-full mb-6 rounded shadow-lg md:h-64 xl:h-80'
            src={item.Photo}
            alt='image'
          />
        </figure>
          <div className="card-body w-full">
            <div className="card-actions justify-end">
              <p>Instructor Name: {item.instructorName}</p>
              <p>Category: {item.category}</p>
              <p> {item.className}</p>
              <p>{item.details}</p>
            
              <p className='text-red-500  front-bold   text-3xl   '>Seats:{item.seats}</p>
              <p  className='text-green-500  front-bold   text-xl   ' >status:{item.status
              
              
              
              
              }</p>
              {/* Add any other payment data fields you want to display */}
            </div>
          </div>
        </div>
      ))}

      <div className='text-center mt-20'>
<button onClick={back} className="btn bg-black text-pink-400 mb-20 mt-20 center btn-lg  hover:bg-primary-700">
Back
</button>
</div> 

    </div>
  );
};

export default Enrolled;






