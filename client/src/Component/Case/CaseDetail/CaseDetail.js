import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles.module.css"
import Select from 'react-select'
import { useParams, Link } from 'react-router-dom';
import CaseDetailBox from "./CaseDetailBox";

function CaseDetail() {

    const { case_id } = useParams();

    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseDetail, setCaseDetail] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-case/" + case_id);
                const data = await response.json();
                setCaseDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, [case_id])

    return (
        <>
         <div className={styles.bodyPage} >
            <div className="flex h-full bg-[#aef1f7]">
                <div className={`${styles.MainPage} `}>
                    <div className="border-b border-gray-300 p-2 flex">
                        <div className="ml-3 font-bold">
                            <span className=" bg-purple-600 p-1 rounded-xl text-white select-none">C{caseDetail.id}</span>
                            <div className="ml-2 inline-block  text-lg">{caseDetail.title}</div>

                        </div>

                    </div>
                    <div className="p-3 h-full">
                        <div className="text-left border-b px-4 py-2 font-medium">Section name</div>
                        
                        <div className="grid grid-cols-4 bg-[#F6FBFF] p-3 border border-[#aecade]">
                            <div className="text-left text-sm">
                                <div className="font-bold">Type</div>
                                <div>{caseDetail.type}</div>
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-bold">Priority</div>
                                <div>{caseDetail.priority}</div>
                            </div>
                            
                        </div>

                        
                        <CaseDetailBox title={"Step"} data={caseDetail.step} />
                        <CaseDetailBox title={"Expectation"} data={caseDetail.expectation} />
                        <CaseDetailBox title={"Step"} />

                    </div>


                </div>

                <div className="bg-[#d2e2ed] w-48 h-screen text-white"></div>
            </div>
            </div>
        </>
    )
}
export default CaseDetail;