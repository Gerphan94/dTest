import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { LinkNew } from "../Common/CustomButton";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProcessRunChart from "./PieChart";
import { BtnNew } from "../Common/CustomButton";

import CaseSelectModal from "./Modal/CaseSelectModal";
import { useGlobalVariables } from "../../Store/AppContext";
import RunSectionCase from "./RunSectionCase";
import AddResultModal from "./Modal/AddResultModal";
function RunView() {

    const { runId } = useParams();
    const { setGlobalProjectId, logginUser } = useGlobalVariables();
    const navigate = useNavigate();

    const urlAPI = process.env.REACT_APP_API_URL;

    const [rundetail, setRundetail] = useState({});

    const [showCaseSelectModal, setShowCaseSelectModal] = useState(false);
    const [data, setData] = useState();
    const [showAddResultModal, setShowAddResultModal] = useState({
        'show': false,
        'runcaseId': null,
        'statusId': 0
    });

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
                setGlobalProjectId(data['project_id']);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const fetchRunCase = async () => {
            try {
                const response = await fetch(urlAPI + "run-api/get-runs-cases/" + runId);
                const data = await response.json();
                console.log(data);
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchRunDetail();
        fetchRunCase();

    }, [runId])

    const renderSections = (sections) => {
        return sections.map((section) => (
            <div key={section.section_id}>
                <RunSectionCase
                    data={section}
                    setShowAddResultModal={setShowAddResultModal}
                // logginUser={logginUser}
                />
                {section.sub && section.sub.length > 0 && (
                    <div className="border-l-[1px] border-[#aecade] pl-5">
                        {renderSections(section.sub)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <>
            <div className="mt-20">
                {/* <div className={styles.bodyPage}> */}
                <div className="flex h-full">
                    <div className="w-full h-full bg-[#EAF1F7]">
                        <div className="flex justify-between p-2 border-b-[1px] border-[#aecade] font-medium">
                            {rundetail?.name}
                            {/* <div>
                                <button>Test Case</button>
                            </div> */}
                        </div>
                        {/* <div className="p-4 flex gap-5">
                            <div className="bg-white min-h-96 w-full">
                                <ProcessRunChart />

                            </div>

                            <div className="bg-white min-h-96 w-full flex flex-col items-center justify-between py-4">
                                <div className="h-full flex flex-col items-center justify-end space-y-[-3px]">
                                    <div className="text-[64px] leading-none">57%</div>

                                    <div className="text-[28px] leading-none">passed</div>
                                </div>

                                <div className="h-full text-center mt-5">

                                    <div className="text-[20px] leading-none">62 / 202 untested (31%).</div>
                                </div>

                            </div>



                        </div> */}

                        {data && renderSections(data)}



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
                    user_id={logginUser.id}
                />}

            {showAddResultModal.show &&
                <AddResultModal
                    showModal={showAddResultModal}
                    setShowModal={setShowAddResultModal}
                    user_id={logginUser.id} />}
        </>
    );
}


export default RunView;