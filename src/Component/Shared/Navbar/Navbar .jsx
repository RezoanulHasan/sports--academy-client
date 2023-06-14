
import { AuthContext } from '../../providers/AuthProvider';
import ActiveLink from '../ActiveLink/ActiveLink'
import { useContext } from 'react';
import Lottie from 'lottie-react';
import giftbox from "../../../assets/giftbox.json"
import { FaHome,FaInnosoft, FaLayerGroup, FaUserTie,FaUserShield } from 'react-icons/fa';
const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
    console.log(user)
    const handleLogout = () => {
        logOut()
            .then(result => { })
            .catch(error => console.error(error));
    }


    return (
      <div className='overflow-hidden'>

        <header className="bg-cover bg-center   bg-fixed" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuFQS96mFPW-nnI09t507pXxRWklVKXWPFw63tKnRU5y8wbxN9Rmu5TG6Unvs9inydLRA&usqp=CAU)' }}>
      
      <div className="  navbar  bg-opacity-30   bg-black  max-w-screen-xl  ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-success lg:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>

            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li className=""> <ActiveLink to="/" >Home </ActiveLink> </li> 
           
        
            <li className=" font-bold "> <ActiveLink to="/allClass" >All classes </ActiveLink> </li> 
            <li className=""> <ActiveLink to="/allInstructors" >Instructors </ActiveLink> </li>
              {user ?
            <li>
               <li className=""> <ActiveLink to="/dashboard" >Dashboard</ActiveLink> </li> 

                <span className=''>
               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="User profile" title={user.displayName}  />
                </div>
              </label>
              <button onClick={handleLogout}>Log out</button>
                </span>
            </li>
            :
            <li><ActiveLink to="/login">Login</ActiveLink></li>
            }
            </ul>



          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                 <img src="https://i.ibb.co/NsH7xRN/Academy-Logo.png" alt="" />
                </div>
              </label>
              <a className=" normal-case text-white  text-2xl">Sports Academy</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className=" text-white  font-bold"> <ActiveLink to="/" >   <FaHome></FaHome>Home </ActiveLink> </li> 
    
            <li className="text-white font-bold "> <ActiveLink to="/allClass" >All <FaLayerGroup></FaLayerGroup>  classes </ActiveLink> </li> 
            <li className="text-white font-bold "> <ActiveLink to="/allInstructors" > < FaUserTie></FaUserTie>  Instructors </ActiveLink> </li>
            
 

        
            { user?
            <li>
          
                <span className=''>
                <li className="text-yellow-400 font-bold"> <ActiveLink to="/dashboard"  ><FaUserShield></FaUserShield>    Dashboard</ActiveLink> </li>
                <label tabIndex={0} className=" btn btn-outline text-white btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="User profile" title={user.displayName}  />
               
                </div>
              </label>
              <button  className='btn btn-outline text-white' onClick={handleLogout}>Log out</button>
                </span>
            </li>
            :
            <li className=" text-white font-bold "><ActiveLink to="/login"><FaInnosoft></FaInnosoft>Login</ActiveLink></li>
            }
         

          </ul>
        </div>
        <div className="navbar-end">
        <Lottie  className='h-20 overflow-hidden'      animationData={giftbox} loop={true} />
      </div>
      </div>
      </header>

<div>


</div>


    </div>
    
    );
};

export default Navbar;