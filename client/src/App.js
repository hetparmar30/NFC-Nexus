import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './HomePage/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Mycard from './components/Mycard';
import Admin from './Admin/Admin';
import IsAdmin from './Admin/IsAdmin';
import UserCard from './UserCard/UserCard';
import Createcard from './CreateCard/Createcard';
import Editcard from './EditCard/Editcard';
import Navigation from './HomePage/Navigation';
import './App.css';

const App = () => {
  return (
    <div className='Main'>
      <BrowserRouter>
        <ConditionalNavigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mycard' element={<Mycard />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/isadmin' element={<IsAdmin />} />
          <Route path='/mycard/:id' element={<UserCard />} />
          <Route path='/createcard' element={<Createcard />} />
          <Route path='/mycard/edit/:id' element={<Editcard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const ConditionalNavigation = () => {
  const location = useLocation();

  // List of exact paths where navigation should not be shown
  const excludedPaths = ['/signup', '/login'];

  // Check if the current path matches any of the excluded paths
  const isExcludedPath = excludedPaths.some(path => location.pathname === path);

  // Check if the current path matches a dynamic route pattern
  const isDynamicPath = location.pathname.startsWith('/mycard/') && location.pathname !== '/mycard';

  // Hide navigation if on an excluded path or dynamic path
  const shouldHideNavigation = isExcludedPath || isDynamicPath;

  return !shouldHideNavigation && <Navigation />;
};

export default App;
