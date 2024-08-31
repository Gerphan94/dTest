import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { LinkNew } from "../Common/CustomButton";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import ProcessRunChart from "./PieChart";

import { FcDataSheet } from "react-icons/fc";

function RunView() {

    const { runId } = useParams();

    const urlAPI = process.env.REACT_APP_API_URL;

    const [runs, setRuns] = useState([]);

    useEffect(() => {
        const fetchRuns = async () => {

        }

          
        

    }, [runId])



    return (
        <div className={styles.bodyPage}>
            <div className="flex h-full">
                <div className="w-full h-full bg-[#EAF1F7]">
                    <div className="flex justify-between p-2 border-b-[1px] border-[#aecade] font-medium">
                        RUN NAME
                        <div>
                            <button>Test Case</button>
                        </div>
                    </div>
                    <div className="p-4 flex gap-5">
                        <div className="bg-white min-h-96 w-full">
                            <ProcessRunChart />

                        </div>

                        <div className="bg-white min-h-96 w-full">

                        </div>
                       

                    </div>
                    
                    
                
                </div>
                <div className="w-80">
                    <div className="p-4">

                        
                    </div>

                </div>

            </div>
        </div>

    );
}


export default RunView;