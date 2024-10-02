import React, { useState, useEffect, useCallback, useContext } from "react";

import styles from "../styles.module.css"
import { useParams } from 'react-router-dom';
import { useGlobalVariables } from "../../Store/AppContext";

import Navbar from "../navBar";

function Overview() {
    const { projectId } = useParams()

    const { setGlobalProjectId, logginUser, setSelectedNavBar } = useGlobalVariables();

    useEffect(() => {
        setGlobalProjectId(projectId)
        setSelectedNavBar('Overview')
    }, [projectId])

    console.log("Project Overview rending .....,", projectId)

    const urlAPI = process.env.REACT_APP_API_URL;

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar projectId={projectId} selectedNavBar="overview" />
                <div className="flex-grow flex  mt-20">
                    <div className="w-full bg-[#EAF1F7]">
                    <div className="border-b border-gray-300 p-2 flex justify-between ">
                        <div className="ml-3 font-medium text-md text-left px-4 py-2">
                            <span className="bg-purple-600 px-1.5 py-0.5 rounded-xl text-white select-none text-sm">
                                P3
                            </span>


                            <div className="ml-2 inline-block">TÊN</div>
                        </div>
                        </div>
                    </div>

                    <div className="bg-[#d2e2ed] w-80 p-4">


                    </div>

                </div >


            </div>
        </>

    )
}
export default Overview;