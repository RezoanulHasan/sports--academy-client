import React from 'react';
import useClass from '../../../../Hooks/useClass';
import { FaTrashAlt } from "react-icons/fa";
import usePayment from '../../../../Hooks/usePayment';
import {  useLoaderData } from 'react-router-dom';


const InsClass = () => {
    const [card] = useClass();
    const [cart]= usePayment();


    const Classes = useLoaderData();


    return (
        <div className="w-full m-10 ">
    
        <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
            <h3 className="text-3xl">Total classes: {card.length}</h3>
                        
        </div>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Img</th>
                        <th>Course Name</th>
                        <th>Category</th>
                        <th>status</th>
               
                     
                 
                    </tr>
                </thead>
                <tbody>
                    {
                        card.map((item, index) => <tr
                            key={item._id}
                        >
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.classPhoto} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.className}
                            </td>
                            <td>
                                {item.category}
                            </td>
                            <td>{item.status}</td>
                           
                      
          
                        </tr>)
                    }


                </tbody>
            </table>

        </div>


        <div className="divider"></div>
<div>
        <h1 className ="front-bold  text-3xl text-center"> Feed back by Admin    </h1>
        <div className='grid grid-cols-1 lg:grid-cols-3'>
      {Classes.map((f) => (
        <Card key={f._id}  f={f}  />
      ))}
    </div>
    </div>
  
  </div>






    );
};


const Card = ({f }) => {

const { className , category,_id,talk } =  f ;

 return (
    <>

    <div className="card w-96 bg-base-100 shadow-xl">
<div className="card-body">
 <h2 className="card-title">ClassName:{className}</h2>
 <h2 className="card-title"> Category:{category}</h2>
 <p>Deatls{talk}</p>
 </div> </div>
    </>

    );
};



export default InsClass;