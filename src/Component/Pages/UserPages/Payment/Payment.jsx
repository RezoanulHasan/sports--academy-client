import React from 'react';
import useCart from '../../../../Hooks/useCart';
import CheckoutFrom from './CheckoutFrom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import useTitle from '../../../../hooks/useTitle';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const back = () => {
      navigate(-1);
    }
  useTitle("Payment")
  const cartItem = cart.find(item => item._id === id);
  const price = cartItem ? cartItem.price : 0;
  const cartToPay = cartItem ? [cartItem] : [];
  return (
    <div className='h-[calc(100vh-68px)] m-10'>
      <h2 className="text-3xl">Payment and enroll this Courses</h2>
      <h1>{price}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutFrom  cart={cartToPay} price={price} />
      </Elements>


      <div className='text-center mt-20'>
<button onClick={back} className="btn bg-black text-pink-400 mb-20 mt-20 center btn-lg  hover:bg-primary-700">
Back
</button>
</div> 

    </div>
  );
};

export default Payment;
