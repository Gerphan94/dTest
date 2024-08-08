import React, { useState, useEffect, useCallback } from "react";

import styles from "../styles.module.css"

import SideBar from "./WorkLogSideBar";
import { useParams } from "react-router-dom";

import WorkTask from "./WorkTask";
import WorkRun from "./WorkRun";
import WorklogModal from "./WorklogModal";

function WorkLog() {

    console.log("MainPage rending .....")
    const urlAPI = process.env.REACT_APP_API_URL;

    const { month } = useParams()

    const [worklogData, setWorklogData] = useState([])


    const [showNewDate, setShowNewDate] = useState(false)

    const [showWLModal, setShowWLModal] = useState(false)



    useEffect(() => {

        const fetchWorklog = async () => {
            try {
                const fetchUrl = urlAPI + "api/get-worklog/" + month;
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setWorklogData(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchWorklog();
    }, [month])



    const onSubmitSection = (data) => {
        console.log(data)
    }

    return (
        <>
            <div className="h-full overflow-y-hidden text-sm">
                <div className="flex bg-slate-50 ">
                    <div className={styles.SideBarHeight}>
                        <SideBar />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="p-4">
                            <div className="flex py-1">
                                {showNewDate ?
                                    <div>

                                    </div>
                                    :
                                    <button 
                                    className="border border-blue-400 px-2 py-1 text-blue-400"
                                    onClick={() => setShowWLModal(true)}
                                    
                                    >Thêm</button>
                                }
                            </div>


                            {worklogData.map((item) => (
                                <>
                                    <div className="bg-slate-300 py-1 text-left px-2">
                                        {item.date} -
                                        {item.name}
                                    </div>
                                    <div className="flex gap-10">
                                        <div className="w-full">
                                            <div>TASK</div>

                                            <WorkTask data={item.task} />

                                        </div>
                                        <div className="bg-slate-400 w-full">
                                            <div>TEST AROUND</div>

                                        </div>

                                    </div>



                                </>


                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {showWLModal && 
            <WorklogModal setShowModal={setShowWLModal} />}

        </>

    )
}
export default WorkLog;