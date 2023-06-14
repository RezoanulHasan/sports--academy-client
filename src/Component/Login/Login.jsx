import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle, FaGithubSquare } from 'react-icons/fa';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../Firebase/Firebase.init';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha';
import useTitle from '../../hooks/useTitle';

const auth = getAuth(app);

const Login = () => {
  useTitle('Login');
  const [Disabled,   setDisabled] = useState("");
  const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit,  setError, reset, formState: { errors, isValid } } = useForm();
  const emailRef = useRef();
  const from = location.state?.from?.pathname || '/';

  // Load captcha
  useEffect(() => {
    loadCaptchaEnginge(3);
  }, []);

  const handleLogin = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);
      const loggedUser = result.user;
      console.log(loggedUser);
      reset();
      target.reset();
      navigate(from, { replace: true });
      toast.success('Sign In successfully. Welcome!', {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        setError('email', { type: 'manual', message: 'Email not found. Please try again.' });
      } else if (error.code === 'auth/wrong-password') {
        setError('password', { type: 'manual', message: 'Password does not match. Please try again.' });
      } else {
        console.log(error);
      }
    }
  });

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.warn('Please provide your email address to reset the password', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.error('Please check your email', {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCaptcha = (event) => {
    const user_captcha_value = event.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const loggedUser = result.user;
        const saveUser = { name: loggedUser.displayName, email: loggedUser.email };
        fetch('https://sports-academy-two.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)
        })
          .then(res => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
        toast.success('Sign In successfully. Welcome!', {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(result => {
        const loggedUser = result.user;
        const saveUser = { name: loggedUser.displayName, email: loggedUser.email };
        fetch('https://sports-academy-two.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)
        })
          .then(res => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
        toast.success('Sign In successfully. Welcome!', {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center   mt-10 mb-10 justify-center min-h-screen bg-green-200">
      <div className="  bg-red-300 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: true })}
              className={`w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-red-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <div className="text-black">{errors.email.message}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password', { required: true })}
              className={`w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-red-500 ${
                errors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-black">{errors.password.message}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="captcha" className="block font-bold mb-2">
              Captcha
            </label>
            <div className="flex">
              <input
                type="text"
                id="captcha"
                name="captcha"
                onBlur={handleCaptcha}
                className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter the captcha"
              />
              <LoadCanvasTemplate />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm  font-bold  text-black hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className=" bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="font-bold  text-black">or log in with</p>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleGoogleSignIn}
              className="text-blue-500 hover:text-blue-700 mx-1 focus:outline-none"
            >
              <FaGoogle size={24} />
            </button>
            <button
              onClick={handleGithubSignIn}
              className="text-gray-700 hover:text-gray-900 mx-1 focus:outline-none"
            >
              <FaGithubSquare size={24} />
            </button>
          </div>
          
          <p className="mt-4 font-bold text-sm">
            Don't have an account?{' '}
            <Link to="/signUp" className="text-black font-bold hover:underline focus:outline-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
