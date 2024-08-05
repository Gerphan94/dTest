import React, { useState, useEffect, useCallback } from "react";

import styles from "../styles.module.css"

import SideBar from "./WorkLogSideBar";
import { useParams } from "react-router-dom";

function WorkLog() {

    console.log("MainPage rending .....")
    const urlAPI = process.env.REACT_APP_API_URL;

    const { yyyymm } = useParams()


    useEffect(() => {
       

    }, [yyyymm])




    const onSubmitSection = (data) => {
        console.log(data)
    }

    return (
        <div className="h-full overflow-y-hidden text-sm">
            <div className="flex bg-slate-50 ">
                <div className={styles.SideBarHeight}>
                    <SideBar />
                </div>
                <div className={styles.MainPage}>
                    MAIN PAGE


                </div>


            </div>
        </div>

    )
}
export default WorkLog;