import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='w-full bg-gray-800 text-white flex flex-col items-center justify-center p-8'>
            <div className='flex gap-6'>
                <a 
                    href="https://github.com/sahal12" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub"
                >
                    <FaGithub size={24} />
                </a>
                <a 
                    href="https://www.linkedin.com/in/sahal12" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={24} />
                </a>
                <a 
                    href="https://www.instagram.com/sahal12" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                >
                    <FaInstagram size={24} />
                </a>
                <a 
                    href="https://www.facebook.com/sahal12" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                >
                    <FaFacebook size={24} />
                </a>
            </div>
            <p className='text-md mt-2 mb-0'>&copy; {new Date().getFullYear()} Sahal Sajeed. All rights reserved.</p>
            <p className='text-sm mt-1 mb-0'>Built with 💙 by Sahal</p>
        </footer>
    );
}

export default Footer;
