import { NavLink, Outlet } from "react-router-dom";
import { FaWallet,FaCreativeCommons,FaAddressCard, FaCalendarAlt, FaHome,FaBuffer,  FaUsers, FaCcStripe ,} from 'react-icons/fa';

import useAdmin from './../../../Hooks/useAdmin';
import useInstructor from "../../../Hooks/useInstructor";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="drawer overflow-hidden ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet />
        <label
          htmlFor="my-drawer"
          className="btn bg-black drawer-button fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 text-white hover:scale-110"
        >
          Click here for open dashboard
          <div className="w-12 rounded-full">
                 <img src="https://i.ibb.co/NsH7xRN/Academy-Logo.png" alt="" />
                </div>

        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full overflow-hidden  bg-black text-white  ">
          {/* Sidebar content here */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
               < FaAddressCard></FaAddressCard> Admin Home
                </NavLink>
              </li>
             
              <li>
                <NavLink to="/dashboard/manageClass">
                  <FaWallet></FaWallet> ManageClasses
                </NavLink>
              </li>
          
              <li>
                <NavLink to="/dashboard/alluser">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          )}

          {isInstructor && (
            <>
              
              <li>
                <NavLink to="/dashboard/addClass">
                <FaWallet></FaWallet>    AddClasses
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/insClass">
                <FaCalendarAlt></FaCalendarAlt> My add Classes
                </NavLink>
              </li>
            </>
          )}      
          {isAdmin || isInstructor ? (
            <>
              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
            </>
          ) :   
          <>
           <li>
            <NavLink to="/dashboard/mycart">
              <FaWallet></FaWallet>My Classes
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/enrolled">
            <FaBuffer></FaBuffer> Enrolled Classes   </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/history">
            <FaCalendarAlt></FaCalendarAlt>  Payment History 
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment/:id">
           < FaCcStripe></FaCcStripe>     Payment 
            </NavLink>
          </li>
         
       
          <div className="divider  bg-white"></div>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
        </>          
    
}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
