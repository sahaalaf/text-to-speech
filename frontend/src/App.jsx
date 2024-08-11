import React, { useState } from 'react'
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginStatusChange = (status) => {
      setLoggedIn(status);
  };

  return (
    <div>
      <Header onLoginStatusChange={handleLoginStatusChange} />
      <HeroSection loggedIn={loggedIn}  />
      <Footer />
      <ToastContainer/>
    </div>
  )
}

export default App
