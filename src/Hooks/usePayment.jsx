import React from 'react';
import { useQuery, useMutation} from 'react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePayment = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user?.email}`);
      console.log('res from axios', res);
      return res.data;
    },
  });

  const updateSeatQuantity = useMutation(
    async (category) => {
      const updatedCart = cart.map((item) => {
        if (item.category === category && item.status === 'enrolled') {
          return {
            ...item,
            seats: item.seats - 1,
          };
        }
        return item;
      });

      // Update the cart data in the cache
      queryCache.setQueryData(['payments', user?.email], updatedCart);

      // Perform API request to update the seat quantity in the backend
      await axiosSecure.put(`/categories/${category}`, { seats: -1 });

      return updatedCart;
    },
    {
      onSuccess: (data) => {
        // Refetch the payment data after successful update
        queryCache.setQueryData(['payments', user?.email], data);
      },
    }
  );

  return [cart, refetch, updateSeatQuantity];
};

export default usePayment;
