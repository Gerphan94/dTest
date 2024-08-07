import React, { useState, useEffect, useCallback } from "react";

import styles from "../styles.module.css"

import SideBar from "./WorkLogSideBar";
import { useParams } from "react-router-dom";

import WorkTask from "./WorkTask";
import WorkRun from "./WorkRun";
import WorklogModal from "./WorklogModal";
import WorkTaskModal from "./WorkTaskModal";

function WorkLog() {

    console.log("MainPage rending .....")
    const urlAPI = process.env.REACT_APP_API_URL;

    const { month } = useParams()

    const [worklogData, setWorklogData] = useState([])


    const [showNewDate, setShowNewDate] = useState(false)

    const [showWLModal, setShowWLModal] = useState(false)
    const [showWTModal, setShowWTModal] = useState(false)

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };



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
                            <div className="flex py-2">
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
                                <div className="border rounded-lg p-3 mb-3">
                                    <div className="bg-slate-300 flex gap-10 py-1 text-left px-2 rounded-lg">
                                        <div>{item.date}</div>
                                        {item.name}
                                    </div>
                                    <div className="flex gap-2 py-2">
                                        <div className="w-full border rounded-lg p-3">
                                            <div className="text-left pb-2 font-bold">TASK</div>
                                            <WorkTask data={item.task} />
                                            <div className="flex py-1">
                                                <button
                                                    className="hover:underline text-blue-400"
                                                    onClick={() => setShowWTModal(true)}
                                                
                                                >Thêm task</button>
                                            </div>
                                        </div>
                                        <div className="bg-slate-400 w-full">
                                            <div>TEST AROUND</div>

                                        </div>

                                    </div>



                                </div>


                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {showWLModal && <WorklogModal setShowModal={setShowWLModal} />}
            {showWTModal && <WorkTaskModal setShowModal={setShowWTModal} />}
        </>

    )
}
export default WorkLog;