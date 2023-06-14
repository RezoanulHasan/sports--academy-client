import React from 'react';
import { Outlet } from 'react-router-dom';

import Spinner from './Component/Shared/Spinner/Spinner';
import Navbar from './Component/Shared/Navbar/Navbar ';
import Footer from './Component/Pages/Home/Footer/Footer';

const App = () => {
  return (
    <div className='overflow-hidden'>
<Navbar></Navbar>
<div>{navigation.state === 'loading' && <Spinner></Spinner>  }</div> 
  <div className='min-h-[calc(100vh-136px)]   overflow-hidden'>
<Outlet></Outlet>
<Footer></Footer>
</div>

    </div>
  );
};

export default App;