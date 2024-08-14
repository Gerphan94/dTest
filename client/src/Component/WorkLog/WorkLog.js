import React, { useState, useEffect, useCallback } from "react";

import styles from "../styles.module.css"

import SideBar from "./WorkLogSideBar";
import { useParams } from "react-router-dom";

import WorkTask from "./WorkTask";
import WorkRun from "./WorkRun";
import WorklogModal from "./WorklogModal";
import WorkTaskModal from "./WorkTaskModal";
import Notice from "../MessageBox/Notice";


function WorkLog() {

    console.log("MainPage rending .....")
    const urlAPI = process.env.REACT_APP_API_URL;

    const { month } = useParams();

    const [worklogData, setWorklogData] = useState([]);
    const [showNewDate, setShowNewDate] = useState(false);
    const [showWLModal, setShowWLModal] = useState(false);
    const [showWTModal, setShowWTModal] = useState(false);
    const [showNotice, setShowNotice] = useState(true);
    const [noticeMsg, setNoticeMsg] = useState("");




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
            {showNotice && <Notice message={noticeMsg} setModalshow={setShowNotice} type="success" />}

            <div className="h-full overflow-y-hidden text-sm">
                <div className="flex bg-slate-50 ">
                    <div className={styles.SideBarHeight}>
                        <SideBar />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="h-full flex flex-col ">
                            <div className="flex gap-4 p-2 h-14 border-b-2">

                                <button
                                    className="border border-blue-400 px-2 py-1 text-blue-400"
                                    onClick={() => setShowWLModal(true)}
                                >Thêm</button>

                            </div>
                            <div className={styles.casePage}>
                                <div className="flex-grow p-4">
                                    {worklogData.map((item) => (
                                        <div className="border rounded-lg mb-3">
                                            <div className="bg-gray-200 flex gap-10 py-1 text-left px-2 rounded-tl-lg">
                                                <div>{item.date}</div>
                                                {item.name}
                                            </div>
                                            <div className="flex gap-2 p-4">
                                        
                                                <WorkTask data={item.task} setShowWTModal={setShowWTModal}/>
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

                </div>
            </div>

            {showWLModal && <WorklogModal setShowModal={setShowWLModal} setNoticeMsg={setNoticeMsg} setShowNotice={setShowNotice} />}
            {showWTModal && <WorkTaskModal setShowModal={setShowWTModal} />}
        </>

    )
}
export default WorkLog;