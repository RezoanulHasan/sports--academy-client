import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../../hooks/useTitle";
import { useForm } from "react-hook-form";

const Register = () => {
  useTitle("Register");
  const [error , setErrors] = useState({});
  const [accepted, setAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const { createUser } = useContext(AuthContext);
  
  
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Clear errors
      reset();

      // Create user
      const userCredential = await createUser(data.email.trim(), data.password.trim());
      const user = userCredential.user;
      console.log(user);

      // Reset form and show success message
      reset();
      navigate("/");
      toast.success(`Registration successful! Welcome, (${user.email})`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Update user profile with name, phone number, and photo URL
      await updateProfile(user, {
        displayName: data.name.trim(),
        phoneNumber: data.phone.trim(),
        photoURL: data.photoURL.trim(),
      });
      
      // Save user to the backend
      const saveUser = {
        name: data.name.trim(),
        email: data.email.trim(),
        photo: data.photoURL.trim(),
        phone: data.phone.trim(),
      };
      const response = await fetch("https://sports-academy-two.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });
      const responseData = await response.json();
      if (responseData.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " ! welcome Registrations successful  .",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.message) {
        reset();
        setErrors({ email: error.message });
      }
    }
  };

  return (
    <>
      <div className="m-5">
      
        <div className="min-h-screen flex items-center justify-center bg-red-100">

          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
              <h2 className="text-center text-black text-3xl font-bold mb-4">Register</h2>

              {/* Name field */}
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-black">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 5,
                      message: "Name must be at least 5 characters long",
                    },
                    pattern: {
                      value: /^[A-Z]/,
                      message: "Name must start with an uppercase letter",
                    },
                  })}
                />
                {errors.name && (
                  <div className="text-red-500 text-xl mt-1">{errors.name.message}</div>
                )}
              </div>

              {/* Email field */}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-black">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500 text-xl mt-1">{errors.email.message}</div>
                )}
              </div>

              {/* Phone field */}
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 text-black  ">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full p-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Invalid phone number format (must be 11 digits)",
                    },
                  })}
                />
                {errors.phone && (
                  <div className="text-red-500 text-xl mt-1">{errors.phone.message}</div>
                )}
              </div>

              {/* photoURL field */}
              <div className="mb-4">
                <label htmlFor="photoURL" className="block mb-2 text-black  ">
                  PhotoURL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="photoURL"
                  className={`w-full p-2 border ${
                    errors.photoURL ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("photoURL", {
                    required: "Photo URL is required",
                    pattern: {
                      value: /^http(s)?:\/\/[^\s]+$/,
                      message: "Invalid photo URL format",
                    },
                  })}
                />
                {errors.photoURL && (
                  <div className="text-red-500 text-xl mt-1">{errors.photoURL.message}</div>
                )}
              </div>

              {/* Password field */}
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-black ">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className={`w-full p-2 border ${
                    errors.password ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*/,
                      message:
                        "Password must contain at least one uppercase letter and one special character",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-500 text-xl mt-1">{errors.password.message}</div>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2 text-black ">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`w-full p-2 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-400"
                  } rounded`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-xl mt-1">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

             
              {/* Submit button */}
              <div className="text-center  ">
                <button
                  type="submit"
            
                  className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700  ${
                    !accepted ? "disabled:opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Register
                </button>
              </div>
            </form>

            {/* Login link */}
            <p className="text-center text-green-500 text-xl">
              <small>
                if you already registered, go login page{" "}
                <Link to="/login">
                  <button className="btn btn-outline btn-warning">Login</button>
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
