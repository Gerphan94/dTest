import React, { useState, useEffect, useCallback } from "react";


import styles from "../styles.module.css"
import { useParams } from 'react-router-dom';
import { useProject } from "../../Store/ProjectProvider";

import Navbar from "../navBar";

function Overview() {
    const { projectId } = useParams()

    const { setProjectId } = useProject();
    setProjectId(projectId)


    console.log("MainPage rending .....,", projectId)

    const urlAPI = process.env.REACT_APP_API_URL;


    return (
        <>

            <Navbar />
            <div className={styles.bodyPage} >
                <div className="h-full flex">
                    <div className={styles.SideBarHeight}>

                    </div>
                    <div className={styles.MainPage}>
                        aa

                    </div>

                </div>

            </div >



        </>

    )
}
export default Overview;