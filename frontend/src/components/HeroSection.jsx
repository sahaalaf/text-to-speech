import React, { useState, useRef } from 'react';
import { RiFontSize2 } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';

const HeroSection = ({ loggedIn }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFontSize, setSelectedFontSize] = useState(16);
    const [text, setText] = useState('');
    const [audioSrc, setAudioSrc] = useState(null);
    const fileInputRef = useRef(null);

    const handleSpeakBtn = async () => {
        try {
            const response = await axios.post('http://localhost:3000/convert', { text });
            const audioSource = `data:audio/mp3;base64,${response.data.audioContent}`;
            setAudioSrc(audioSource);
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
    };

    const fontSizes = [
        { label: "12", value: 12 },
        { label: "14", value: 14 },
        { label: "16", value: 16 },
        { label: "18", value: 18 },
        { label: "20", value: 20 },
    ];

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFontSizeChange = (value) => {
        setSelectedFontSize(value);
        setIsDropdownOpen(false);
    };

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setText(reader.result);
            };
            reader.readAsText(file);
        }
    };

    const handleSpeakBtnClick = () => {
        if (!loggedIn) {
            toast.error("Please log in to use this feature.");
        } else {
            handleSpeakBtn();
        }
    };

    return (
        <div className='bg-[#e6eef3] w-full h-screen flex flex-col items-center justify-center mt-8'>
            <div className='flex flex-col items-center gap-4 mt-6'>
                <p className='w-[70%] text-[20px] text-center font-medium text-blue-500'>FREE TOOL</p>
                <h3 className='text-[50px] font-semibold mb-4'>Welcome to SpeakEasy</h3>
                <p className='text-2xl font-medium'>
                    Type the text or upload a text file to be read out loud. Currently, we offer just one voice.
                </p>
            </div>
            <div className='w-[80%] bg-white mt-14 rounded-md'>
                <div className='flex flex-col gap-2 mt-6'>
                    <div className='flex flex-row items-center justify-between px-6'>
                        <button
                            className='bg-gray-100 p-2 h-[50px] w-[200px] rounded-md font-semibold text-lg'
                            onClick={handleFileUpload}
                        >
                            <i className="fa-solid fa-upload mr-2"></i>Upload text file
                        </button>
                        <input
                            type='file'
                            accept='.txt'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        <div className='relative'>
                            <button
                                className='bg-gray-100 p-2 h-[50px] w-[200px] rounded-md font-semibold text-lg flex items-center justify-center'
                                onClick={handleDropdownClick}
                            >
                                <RiFontSize2 size={24} />
                                <span className='ml-2'>Font: {selectedFontSize}px</span>
                                <IoMdArrowDropdown size={36} />
                            </button>
                            {isDropdownOpen && (
                                <ul className='absolute top-full right-0 mt-2 w-[130px] bg-white border border-gray-300 rounded-md shadow-lg'>
                                    {fontSizes.map((size) => (
                                        <li
                                            key={size.value}
                                            className='p-2 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => handleFontSizeChange(size.value)}
                                        >
                                            {size.label}px
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='border border-blue-300 outline-blue-200 mx-6 rounded-md p-4 resize-none'
                        rows={8}
                        style={{ fontSize: `${selectedFontSize}px` }}
                        placeholder='Enter your text or upload a text file below, and choose a voice to hear your words spoken out loud. Our app supports a variety of voices and languages, and for now, we have one voice available to showcase our functionality.'
                    ></textarea>
                    <div className='flex flex-row justify-between px-6'>
                        <button
                            className={`bg-gray-100 p-2 h-[50px] w-[150px] rounded-md font-semibold text-lg ${!loggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleSpeakBtnClick || !loggedIn}
                        >
                            <i className="fa-solid fa-volume-high mr-2"></i>Speak
                        </button>
                        <button
                            className='bg-gray-100 p-2 h-[50px] w-[200px] rounded-md font-semibold text-lg mb-6'
                            onClick={() => {
                                if (audioSrc) {
                                    const link = document.createElement('a');
                                    link.href = audioSrc;
                                    link.download = 'audio.mp3';
                                    link.click();
                                }
                            }}
                        >
                            <i className="fa-solid fa-download mr-2"></i>Download MP3
                        </button>
                    </div>

                    <div className='flex items-center justify-center mt-2 mb-4'>
                        {audioSrc && <audio className='w-[800px] bg-transparent' controls src={audioSrc}></audio>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
