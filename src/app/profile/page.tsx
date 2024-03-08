"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Unity, useUnityContext } from "react-unity-webgl";
import Footer from '../components/Footer'
import useStore from '../../StateStore'
import Instructions from "../components/Instructions";
import Chatbot from "../components/chatbot/Chatbot";
import dynamic from 'next/dynamic'


const CopilotWalkthrough = dynamic(
    () => import('../components/walkthrough/CopilotWalkthrough'),
    { ssr: false }
)
const TwinWalkthrough = dynamic(
    () => import('../components/walkthrough/TwinWalkthrough'),
    { ssr: false }
)


export default function ProfilePage() {
    const { showVoiceCommands, setShowVoiceCommands, commonElementSize, commandName } = useStore();
    const { unityProvider, sendMessage, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: "Build/asrsTwin.loader.js",
        dataUrl: "Build/asrsTwin.data.unityweb",
        frameworkUrl: "Build/asrsTwin.framework.js.unityweb",
        codeUrl: "Build/asrsTwin.wasm.unityweb",
    });
    const loadingPercentage = Math.round(loadingProgression * 100);


    return (
        <div id="playground" className="relative w-screen h-screen flex justify-center">
            {/* <TwinWalkthrough />
            <CopilotWalkthrough /> */}
            {/* loader for unity */}
            {!isLoaded && <div className="absolute text-xl text-red-400 w-full h-full justify-center items-center flex flex-col">
                <h1 className="text-yellow-600 mb-16 text-7xl ">ASRS-COPILOT</h1>
                <div className="w-1/2 h-auto bg-gray-200 rounded-md overflow-hidden">
                    <div className=" h-full bg-gray-200 rounded-md overflow-hidden">
                        <div
                            className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  transition-all"
                            style={{ width: `${loadingPercentage}%` }}
                        >
                            <p className="text-black p-2 px-4 flex flex-row" >Loading... <span>({loadingPercentage}%)</span></p>
                        </div>
                    </div>
                </div>
            </div>}

            {showVoiceCommands && <Instructions setShowVoiceCommands={setShowVoiceCommands} />}

            <div id="ASRS" className="w-full h-full ">
                < Unity id="unityProvider" className={`w-full h-full`} unityProvider={unityProvider} />

            </div>

            <div id="Footer" className={`${isLoaded ? "block" : "hidden"} fixed bottom-5 p-1 w-full `}>
                <div id="contros"><Footer callUnityFunction={sendMessage} /></div>
                {/* <div id="Chatbot" className="absolute bottom-0 right-0">chatbot</div> */}
            </div>
            {(commonElementSize == "small" && commandName.length > 0 && isLoaded) &&
                <div className="text-black text-xl bg-slate-200 opacity-50 rounded p-1 rounded-l absolute bottom-20 mb-2 ">{commandName}</div>
            }
        </div>

    )
}