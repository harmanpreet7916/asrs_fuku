// UiComponent1.js
'use client'
import React, { useState } from 'react';
import useStore from '../../StateStore';
import CommandsMic from '../components/CommandMic'

const Footer = ({ callUnityFunction }) => {
    const { commonElementSize, restartButtonEnabled, setRestartButtonEnabled, setCommonElementSize, playAnimation, setplayAnimation, setShowVoiceCommands } = useStore();

    const skipAnimation = async () => {
        try {
            setCommonElementSize('small');

            setplayAnimation(false)
            await callUnityFunction("GameManager", "Screen3");
        } catch (error) {
            console.log("cant change the seen try again")
        }
    };

    const watchAnimation = async () => {

        setCommonElementSize('large');

        await callUnityFunction("GameManager", "Screen2")
        setRestartButtonEnabled(false);
        setplayAnimation(false)


    };

    const restartAnimation = async () => {

        await callUnityFunction("GameManager", "Restart");
        setplayAnimation(true)
    };

    const ToggleAnimation = () => {
        if (playAnimation === false) {
            // handlePlayAnimation();
            setplayAnimation(true);

            callUnityFunction("GameManager", "Pause")
        } else if (playAnimation === true) {
            callUnityFunction("GameManager", "PlayResume")
            // handlePauseAnimation();
            setplayAnimation(true);

        }
        setRestartButtonEnabled(true);
    }
    const PlayPauseAnimation = () => {
        if (playAnimation) {

            callUnityFunction("GameManager", "Pause")
        } else {
            callUnityFunction("GameManager", "PlayResume")

        }

        setplayAnimation(!playAnimation)
        setRestartButtonEnabled(true)
    }


    return (

        <div className='w-full flex justify-center text-white'>
            {true &&
                <div className='bg-indigo-950 border rounded-xl shadow-lg ring-offset-2 bg-opacity-50 px-2 py-1 '>
                    {
                        commonElementSize == "large" ?
                            <div className="animationFooter flex flex-row justify-center h-full gap-9">


                                <div className=' '>
                                    <button className='gotoCopilotButton m-1 ml-2  shadow-md shadow-gray-500/50 border hover:border-green-900 text-base   hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-200   bg-teal-100 text-teal-700          duration-200 ease-in-out border-teal-600 transition active:bg-blue-800' onClick={skipAnimation}>Copilot</button>
                                </div>



                                <div className='flex justify-center  '>
                                    <button className='playButton p-2 bg-[#4cdf7f] shadow-md shadow-gray-500/50 m-auto rounded-full hover:scale-110 focus:border' onClick={PlayPauseAnimation}>
                                        {playAnimation ?
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10 5C10 3.34315 8.65686 2 7 2H5C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H7C8.65686 22 10 20.6569 10 19V5ZM8 5C8 4.44772 7.55229 4 7 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H7C7.55229 20 8 19.5523 8 19V5Z" fill="#FFFFFF" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M22 5C22 3.34315 20.6569 2 19 2H17C15.3431 2 14 3.34315 14 5V19C14 20.6569 15.3431 22 17 22H19C20.6569 22 22 20.6569 22 19V5ZM20 5C20 4.44772 19.5523 4 19 4H17C16.4477 4 16 4.44772 16 5V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V5Z" fill="#FFFFFF" />
                                            </svg> :
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
                                            </svg>
                                        }
                                    </button>
                                </div>
                                <button disabled={!restartButtonEnabled} className=' restartButton p-2 px-5  active:bg-blue-800 m-1 mr-2  col-span-1  disabled:bg-blue-50 disabled:cursor-default disabled:scale-100
                                shadow-md shadow-gray-500/50 active:animate-spin border hover:border-green-900 text-base hover:scale-110 focus:outline-none flex justify-center py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 duration-200 ease-in-out border-teal-600 transition ' onClick={restartAnimation}>
                                    Restart
                                </button>
                            </div>
                            :
                            <div className='copilotFooter flex flex-row justify-center h-full gap-9'>
                                <div>

                                    <button className=' m-1 ml-2  shadow-md shadow-gray-500/50 active:animate-spin border hover:border-green-900 text-base   hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  hover:bg-teal-200   bg-teal-100         text-teal-700          duration-200 ease-in-out         border-teal-600 transition active:bg-blue-800' onClick={watchAnimation}>Animation</button>
                                </div>

                                <div title='Click to give voice commands' className='hover:scale-110 '>
                                    <CommandsMic callUnityFunction={callUnityFunction} />
                                </div>
                                <div>
                                    <button id='Instruction' className='instructionButton  p-2 px-5  active:bg-blue-800 m-1 mr-2  col-span-1  disabled:bg-blue-50 disabled:cursor-default disabled:scale-100
                                shadow-md shadow-gray-500/50 active:animate-spin border hover:border-green-900 text-base hover:scale-110 focus:outline-none flex justify-center py-2 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 duration-200 ease-in-out border-teal-600 transition' onClick={() => { setShowVoiceCommands(true) }} >Instructions</button>
                                </div>
                            </div>
                    }

                </div>
            }
        </div>
    );
};

export default Footer;
