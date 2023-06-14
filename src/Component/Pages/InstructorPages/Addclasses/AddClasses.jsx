import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import useTitle from '../../../../hooks/useTitle';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const [uploadedClassImageUrl, setUploadedClassImageUrl] = useState('');
 
  const [axiosSecure] = useAxiosSecure(); 
  const { user} = useAuth();  
  useTitle("Add Class");

  const img_hosting_url = `https://api.imgbb.com/1/upload`;

  console.log(img_hosting_token);

  const handleImageUpload = async (event, setImageUrl) => {
    const file = event.target.files[0];

    // Create a new FormData object
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', img_hosting_token);

    try {
      // Send a POST request to the ImageBB API
      const response = await axios.post(img_hosting_url, formData);
      const imageUrl = response.data.data.url;

      // Set the uploaded image URL in the state
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleAddClass = (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.className.value;
    const price = form.price.value;
    const seats = form.seats.value;
    const category = form.category.value;
    const instructorName = form.instructorName.value;
    const email = form.email.value;
    const details = form.details.value;
const instructorPhoto =form.instructorPhoto.value;
    const newClass = {
      className,
      price,
      seats,
      category,
      details,
      instructorName,
      email,
      classPhoto: uploadedClassImageUrl,
      instructorPhoto,
      status: 'pending', // Set the initial status as 'pending'
    };

    console.log(newClass);

    // send data to the server
    fetch('https://sports-academy-two.vercel.app/classes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newClass),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Class Added Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
        form.reset();
      });
  };

  return (
    <>
      <div className="m-10 overflow-hidden">
        <div className="bg-emerald-500 p-24">
          <h2 className="text-3xl mb-5 text-center font-extrabold">Add Class</h2>
          <form onSubmit={handleAddClass}>
            {/* form className and seats row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="className"
                    placeholder="Class Name"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2 lg:ml-4">
                <label className="label">
                  <span className="label-text">Seats</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="seats"
                    placeholder="Seats"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            {/* form price and category row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2 lg:ml-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            {/* form instructorName and email row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Instructor Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="instructorName"
                    placeholder="Instructor Name"
                    className="input input-bordered w-full"
                    defaultValue={user?.displayName}
                    required readOnly
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2 lg:ml-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required readOnly
                    defaultValue={user?.email} 
                  />
                </label>
              </div>
            </div>
            {/* form class photo and instructor photo row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Class Photo</span>
                </label>
                <label className="input-group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageUpload(event, setUploadedClassImageUrl)}
                    className="input input-bordered w-full"
                    required 
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2 lg:ml-4">
                <label className="label">
                  <span className="label-text">Instructor Photo</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="instructorPhoto"
                    className="input input-bordered w-full"
                    readOnly  defaultValue={user?.photoURL}
                    required
                  />
                </label>
              </div>
            </div>
            {/* form details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <label className="input-group">
                <input
                type="textarea" 
                  name="details"
                  placeholder="Enter class details"
                  className="input input-bordered w-full rounded-md"
             
                ></input>
              </label>
            </div>
            {/* submit button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Add Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClass;
