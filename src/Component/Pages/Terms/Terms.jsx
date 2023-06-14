import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';


const Terms = () => {

    useTitle("Terms ")
 
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
      }

    return (
        <div>
           <h1 className='text-center front-bold text-2xl ' >      Terms and condition </h1>

<div className='text-center'>
<button onClick={back} className="btn bg-black text-pink-400 mb-10 mt-4  center btn-lg  hover:bg-primary-700">
Back
</button>
</div> 
        </div>
    );
};

export default Terms;