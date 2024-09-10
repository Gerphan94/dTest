import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { LinkNew } from "../Common/CustomButton";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProcessRunChart from "./PieChart";
import { BtnNew } from "../Common/CustomButton";

import CaseSelectModal from "./Modal/CaseSelectModal";
import { useGlobalVariables } from "../../Store/AppContext";

function RunView() {

    const { runId } = useParams();
    const { projectId, setProjectId } = useGlobalVariables();
    const navigate = useNavigate();

    const [proId, setProId] = useState(null);


    const urlAPI = process.env.REACT_APP_API_URL;

    const [runs, setRuns] = useState([]);
    const [rundetail, setRundetail] = useState({});

    const [showCaseSelectModal, setShowCaseSelectModal] = useState(false);

    useEffect(() => {
        
        const fetchRunDetail = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-run-detail/" + runId);
                const data = await response.json();
                const resCode = response.status;
                if (resCode === 404) {
                    navigate('/', { state: { eMessage: 'Field Test Run is not a valid test run.' } });
                    return;
                }
                setRundetail(data);
                // setProId(data['project_id']);
                setProjectId(data['project_id']);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchRunDetail();

    }, [runId])

    





    return (
        <>

            <div className={styles.bodyPage}>
                <div className="flex h-full">
                    <div className="w-full h-full bg-[#EAF1F7]">
                        <div className="flex justify-between p-2 border-b-[1px] border-[#aecade] font-medium">
                            {rundetail?.name}
                            {/* <div>
                                <button>Test Case</button>
                            </div> */}
                        </div>
                        <div className="p-4 flex gap-5">
                            <div className="bg-white min-h-96 w-full">
                                <ProcessRunChart />

                            </div>

                            <div className="bg-white min-h-96 w-full">

                            </div>


                        </div>



                    </div>
                    <div className="w-80 bg-[#D2E2ED]">
                        <div className="p-4">
                            <BtnNew onClick={() => setShowCaseSelectModal(true)} name="Select Case" />


                        </div>

                    </div>

                </div>
            </div>
            {showCaseSelectModal &&
                <CaseSelectModal
                    setShowModal={setShowCaseSelectModal}
                    project_id={rundetail?.project_id}
                    runId={runId}
                />}
        </>
    );
}


export default RunView;