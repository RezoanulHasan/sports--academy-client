import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import "./Checkout.css";
import Swal from 'sweetalert2';

const CheckoutFrom = ({ cart, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [totalEnrolledStudents, setTotalEnrolledStudents] = useState(0);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [payment, setPayment] = useState({});

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        })
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
  
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
  
    if (error) {
      console.log('error', error);
      setCardError(error.message);
    } else {
      setCardError('');
    }
  
    setProcessing(true);
  
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous'
          },
        },
      },
    );
  
    if (confirmError) {
      console.log(confirmError);
    }
    console.log('payment intent', paymentIntent);
  


    setProcessing(false);

   

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
    
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map(item => item._id),
        status: 'enroll',
        className: cart.map(item => item.className),
        category: cart.map(item => item.category),
        instructorName: cart.map(item => item.instructorName),
        details: cart.map(item => item.details),

        seats: cart.map(item => {
          if (item.status !== 'enroll') {
            return item.seats - 1;
          }
          return item.seats;
        }),

        totalEnrolledStudents: totalEnrolledStudents + 1
        
        , 
      // Include the total number of enrolled students
        Photo: cart.map(item => item.classPhoto),
       
      };


 axiosSecure.post('/payments', payment)
  .then(res => {
 console.log(res.data);
  if (res.data.result.insertedId) {
   // Display success alert
   Swal.fire({
 icon: 'success',
  title: 'Payment Successful',
   text: 'Thank you for your payment.',
          });
          // Increment the count of enrolled students
          setTotalEnrolledStudents(prevCount => prevCount + 1);
        }
        setPayment({});
        setTransactionId('');
      })
  }
};
 
    
  
  

    return (
   
        <>
        <form className="w-2/3 m-8" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
            {processing ? <ImSpinner9 className='m-auto animate-spin text-red-400  ' size={24} /> : 'Pay amount'} 
            </button>
        </form>
     {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
 {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
   
  

    </>
     
    );
};

export default CheckoutFrom;