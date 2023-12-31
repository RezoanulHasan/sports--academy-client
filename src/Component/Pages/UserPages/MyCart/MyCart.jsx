import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useCart from "../../../../Hooks/useCart";
import useTitle from "../../../../hooks/useTitle";
import { Link } from "react-router-dom";

const MyCart = () => {
    useTitle("AllUsers");
    const [cart, refetch] = useCart();
    console.log(cart);
    // how does reduce work!!!
    const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);
 

    const handlePay = (item) => {
        // Navigate to the payment page with the cart ID
        return `/dashboard/payment/${item._id}`;
      };
    
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://sports-academy-two.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full m-10 ">
      
            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Total Items: {cart.length}</h3>
                <h3 className="text-3xl">Total Price: ${total}</h3>
                            
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
                            <th>Price</th>
                            <th>seats</th>
                            <th>status</th>
                            <th>Action</th>
                            <th>payment</th>
                     
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
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
                                <td className="">${item.price}</td>
                                <td className="">{item.seats}</td>
                                <td className="">{item.status}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                                <td>
                          
            
             <td>
    <Link to={handlePay(item)} className="btn btn-warning">PAY</Link>
  </td>

             </td>            
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;   
