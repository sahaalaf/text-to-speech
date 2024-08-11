import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';

const Header = ({ onLoginStatusChange }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Load Google API script and initialize it
        const loadGapiScript = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: '996970118720-bl0sn92ir8brk72pcmmligr2smv8gq3b.apps.googleusercontent.com',
                });
            });
        };

        // Call the load script function
        loadGapiScript();

        // Retrieve login status from local storage
        const status = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(status);
        onLoginStatusChange(status);
    }, [onLoginStatusChange]);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            localStorage.setItem('loggedIn', 'true');
            setLoggedIn(true);
            onLoginStatusChange(true);
        },
        onError: () => {
            setLoggedIn(false);
            onLoginStatusChange(false);
        }
    });

    const handleLoginLogout = () => {
        if (loggedIn) {
            const auth2 = gapi.auth2.getAuthInstance();
            if (auth2) {
                auth2.signOut().then(() => {
                    localStorage.setItem('loggedIn', 'false');
                    setLoggedIn(false);
                    onLoginStatusChange(false);
                    console.log('Logged out successfully');
                }).catch((error) => {
                    console.error('Logout failed', error);
                });
            } else {
                console.error('Google API not initialized');
            }
        } else {
            login();
        }
    };

    return (
        <div className='w-full h-[85px] shadow-md flex items-center justify-between bg-white z-20 fixed top-0 left-0'>
            <div className='flex items-center gap-2 ml-24'>
                <img className='w-[60px] h-[60px]' src={logo} alt="SpeakEasy Logo" />
                <h3 className='text-[22px] font-semibold'>
                    Speak<span className='text-red-500'>Easy</span>
                </h3>
            </div>
            <div className='mr-24'>
                <button 
                    className='bg-transparent border-[2px] border-blue-300 p-2 w-[120px] font-normal rounded-md hover:bg-blue-300 hover:text-white'
                    onClick={handleLoginLogout}
                >
                    {loggedIn 
                    ? 
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <i className="fa-solid fa-person-walking-arrow-right"></i>
                        <p>Logout</p>
                    </div> 
                    : 
                    <div className='flex flex-row items-center justify-center gap-2'>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <p>Login</p>
                    </div>}
                </button>
            </div>
        </div>
    );
}

export default Header;
