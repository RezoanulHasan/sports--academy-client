import React, { useState, useEffect } from 'react';
import useTitle from '../../../../hooks/useTitle';
import { useLoaderData, useNavigate } from 'react-router-dom';
import GetRandomColor from '../../../Shared/GetRandomColor/GetRandomColor';
import {AiFillCaretLeft} from "react-icons/ai";
const ManageClass = () => {
  useTitle('ManageClasses');
  const [classes, setClasses] = useState([]);
  const textColor = GetRandomColor();
  const navigate = useNavigate();
  const back = () => {
      navigate(-1);
    }
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    // Fetch the classes data from the server
    // You can replace the placeholder URL with your actual API endpoint
    fetch('https://sports-academy-two.vercel.app/classes')
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.log('Error fetching classes:', error);
      });
  };

  const handleApprove = (id) => {
    updateClassStatus(id, 'Approved');
  };

  const handleDeny = (id) => {
    updateClassStatus(id, 'Denied');
  };


  
  const updateClassStatus = (id, status) => {
    fetch(`https://sports-academy-two.vercel.app/classes/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // Update state with the updated class
          const updatedClasses = classes.map((cls) => {
            if (cls._id === id) {
              return { ...cls, status };
            }
            return cls;
          });
          setClasses(updatedClasses);
        }
      })
      .catch((error) => {
        console.log('Error updating class status:', error);
      });
  };

  return (
    <>
    <div className='m-10 overflow-hidden'>
    <h1
        style={{ color: textColor }}
        className="font-bold font-sans text-3xl text-center mb-10 border-x-4 border-indigo-500"
      >
   All CLASSES - {classes.length}
      </h1>

      <div className="m-10 gap-15 grid grid-cols-1 lg:grid-cols-3">
        {classes.map((Class) => (
          <Cards
            key={Class._id}
            Class={Class}
            onApprove={handleApprove}
            onDeny={handleDeny}
        />
        ))}
      </div>
      <div className='text-center'>
<button onClick={back} className="btn bg-black text-pink-400 mb-10 mt-4  center btn-lg  hover:bg-primary-700">
<AiFillCaretLeft></AiFillCaretLeft> Back
</button>
</div> 
      </div>
    </>
  );
};

const Cards = ({ Class, onApprove, onDeny, onFeedback ,}) => {
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
    status,
  } = Class;

  const navigate = useNavigate();

  const textColor = GetRandomColor();

  const isApproved = status === 'Approved';
  const isDenied = status === 'Denied';

  const handleFeedback = (id) => {
  const feedbackPageUrl = `/dashboard/feedback/${_id}`;
  navigate(feedbackPageUrl);
 
    const updateClassStatus = (id, status) => {
      fetch(`https://sports-academy-two.vercel.app/classes/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            // Update state with the updated class
            const updatedClasses = classes.map((cls) => {
              if (cls._id === id) {
                return { ...cls, status };
              }
              return cls;
            });
            setClasses(updatedClasses);
          }
        })
        .catch((error) => {
          console.log('Error updating class status:', error);
        });
    };
  

  };

  return (
   
    <div className="m-10">
   
    <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
      <figure>
        <img
          className="object-cover w-full mb-6 rounded shadow-lg md:h-64 xl:h-80"
          src={classPhoto}
          alt="image"
        />
      </figure>
      <div className="card-body w-full">
        <h2 className="card-title">Instructor Name: {instructorName}</h2>
        <div className="badge badge-primary">Course:{className}</div>
        <div className="flex justify-between">
          <div className="badge badge-warning">Seats:{seats}</div>
          <div className="badge  badge-secondary ">Price:{price}$</div>
        </div>

        <h2 className="text-xl">Category: {category}</h2>

        <div className="card-actions justify-end">
          <p>{details}</p>

          <div className="card-actions justify-end">
            {isApproved ? (
              <div className="btn btn-success" disabled>
                Approved
              </div>
            ) : (
              <div
                className="btn btn-primary"
                onClick={() =>  onApprove(_id)}
                disabled={isDenied}
              >
                Approve
              </div>
            )}

            {isDenied ? (
              <div className="btn btn-error" disabled>
                Denied
              </div>
            ) : (
              <div
                className="btn btn-warning"
                onClick={() => onDeny (_id)}
                disabled={isApproved}
              >
                Deny
              </div>
            )}

            <div className="btn btn-accent" onClick={handleFeedback}>
              Feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default ManageClass;
