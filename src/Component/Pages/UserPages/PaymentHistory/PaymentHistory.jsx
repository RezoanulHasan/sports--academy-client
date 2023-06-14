import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePayment from '../../../../Hooks/usePayment';
import useTitle from '../../../../hooks/useTitle';

const PaymentHistory = () => {
  useTitle("Pay-history");
  const [cart, refetch] = usePayment();
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  // Sort the payment history by date in descending order
  const sortedCart = [...cart].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatTime = (time) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col mt-10 mb-5 m-20 justify-center items-center h-screen">
    <div className="overflow-x-auto">
      <table className="table-auto bg-white shadow-lg rounded-lg ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Instructor Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Class Name</th>
            {/* Add any other table headers you want */}
          </tr>
        </thead>
        <tbody>
          {sortedCart.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{formatTime(item.date)}</td>
              <td className="border px-4 py-2">{item.instructorName}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.className}</td>
              {/* Add any other table cells you want */}
            </tr>
          ))}
        </tbody>
      </table>

        <div className='text-center mt-8'>
          <button
            onClick={back}
            className='btn bg-black text-pink-400 mb-20 mt-20 center btn-lg hover:bg-primary-700'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
