import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Error from './Component/Shared/Error/Error.jsx';
import Home from './Component/Pages/Home/Home.jsx';
import AuthProvider from './Component/providers/AuthProvider.jsx';
import Login from './Component/Login/Login.jsx';
import Register from './Component/Regestasion/Register.jsx';
import Terms from './Component/Pages/Terms/Terms';
import Dashboard from './Component/Pages/Dasboard/Dashboard.jsx';
import AllUser from './Component/Pages/AdminPages/AllUser/AllUser.jsx';
import AddClasses from './Component/Pages/InstructorPages/Addclasses/AddClasses.jsx';
import AllClass from './Component/Pages/AllClass/AllClass.jsx';
import AllInstructors from './Component/Pages/AllInstructors/AllInstructors.jsx';
import ManageClass from './Component/Pages/AdminPages/ManageClasses/ManageClass.jsx';
import MyCart from './Component/Pages/UserPages/MyCart/MyCart.jsx';
import Payment from './Component/Pages/UserPages/Payment/Payment.jsx';
import Enrolled from './Component/Pages/UserPages/Payment/Enrolled/Enrolled.jsx';
import PaymentHistory from './Component/Pages/UserPages/PaymentHistory/PaymentHistory.jsx';
import Feedback from './Component/Pages/AdminPages/Feedback/Feedback.jsx';
import InsClass from './Component/Pages/InstructorPages/InsClass/InsClass.jsx';
import AdminHome from './Component/Pages/AdminPages/AdminHome/AdminHome.jsx';




const queryClient = new QueryClient()
const router = createBrowserRouter([

  {
    path: "/",
    element: <App></App>,
    errorElement:<Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <Register></Register>,
      },
      {
        path: "terms",
        element: <Terms></Terms>,
      },
      {
        path: "allClass",
        element: <AllClass></AllClass>,
        loader: () => fetch('https://sports-academy-two.vercel.app/classes'),
      },
      {
        path: "allInstructors",
        element: <AllInstructors></AllInstructors>,
        loader: () => fetch('https://sports-academy-two.vercel.app/classes'),
      },

    ],
  },


  {
    path: "dashboard",
    element:<Dashboard></Dashboard>,
    errorElement:<Error></Error>,
    children: [
     //admin
      {
        path: 'alluser', 
        element:    <AllUser></AllUser> ,

      },
 
      {
        path: 'adminHome', 
        element:    <AdminHome></AdminHome>     ,

      },


       {
        path:    'feedback/:id', 
        element: <Feedback></Feedback>   ,
        loader: ({params}) => fetch(`https://sports-academy-two.vercel.app/classes/${params.id}`),

      },
      {
     path: 'manageClass', 
        element: <ManageClass></ManageClass> ,
        loader: () => fetch('https://sports-academy-two.vercel.app/classes'),
      },
      
      //instructor
     
 {
        path: "addClass",
        element:  <AddClasses></AddClasses>,
 },

 {
  path: "insClass",
  element: <InsClass></InsClass>,
  loader: () => fetch('https://sports-academy-two.vercel.app/feedbacks'),

},

//uses
      {
        path: 'mycart', 
        element: <MyCart></MyCart>,
      },

      {
        path:'payment/:id',
        element: <Payment></Payment>,
       
      },

   {
        path:'history',
        element:<PaymentHistory></PaymentHistory>,
       
      },
      {
        path:'enrolled',
        element:<Enrolled></Enrolled> ,
  
      },
     
     
    ],
  },


])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<AuthProvider>
    <QueryClientProvider client={queryClient}>
 <RouterProvider router={router} />
 </QueryClientProvider>
 </AuthProvider>
  </React.StrictMode>,
)
