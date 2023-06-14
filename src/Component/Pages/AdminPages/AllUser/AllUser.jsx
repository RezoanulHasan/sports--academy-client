import React from 'react';
import { useQuery } from 'react-query';
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import useTitle from '../../../../hooks/useTitle';

const AllUser = () => {
  useTitle("AllUsers");

  const [axiosSecure] = useAxiosSecure(); 
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const handleMakeAdmin = user => {
    fetch(`https://sports-academy-two.vercel.app/users/admin/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  const handleMakeInstructor = user => {
    fetch(`https://sports-academy-two.vercel.app/users/instructor/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  const handleDelete = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete ${user.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://sports-academy-two.vercel.app/users/${user._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} has been deleted!`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    });
  };

  return (
<div className="m-5 mb-10">
  <h3 className="text-3xl text-center font-semibold my-4">Total Users: {users.length}</h3>
  <div className="overflow-x-auto">
    <div className="w-full">
      <table className="border min-w-full">
        <thead>
          <tr className ="bg-gray-100">
            <th className="py-2 px-4">No.</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
          <tr key={user._id}>
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{user.name}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">
              {user.role === 'admin' ? (
              'admin'
              ) : user.role === 'instructor' ? (
              'instructor'
              ) : (
              <div className="space-x-2 space-y-2">
                <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-600 text-white">
                  Admin <FaUserShield />
                </button>
                <button onClick={() => handleMakeInstructor(user)} className="btn btn-ghost bg-blue-600 text-white">
                  Instructor
                </button>
              </div>
              )}
            </td>
            <td className="py-2 px-4">
              <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white">
                <FaTrashAlt />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default AllUser;
