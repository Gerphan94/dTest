import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from 'react-router-dom';
import CaseDetailBox from "./CaseDetailBox";
import { CiEdit } from "react-icons/ci";

import { useGlobalVariables } from "../../../Store/AppContext";
import moment from "moment";
import styles from "../../styles.module.css";

function CaseDetail() {

    const { projectId, caseId } = useParams()
    const { setGlobalProjectId,setSelectedNavBar, logginUser } = useGlobalVariables();
    
    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseDetail, setCaseDetail] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-case-by-id/" + caseId);
                const data = await response.json();
                setCaseDetail(data);
                document.title = data.title + ' - dTest'
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
        setGlobalProjectId(projectId);
        setSelectedNavBar('cases');
        

    }, [caseId])

    const isAllDataEmpty = !caseDetail.description &&
        !caseDetail.precondition &&
        !caseDetail.step &&
        !caseDetail.expectation;

    return (
        <>
        
           <div className="flex-grow mt-20 flex overflow-auto">
                <div className='w-full bg-[#EAF1F7] pb-20'>
                    <div className="border-b border-gray-300 p-2 flex justify-between ">
                        <div className="ml-3 font-medium text-md">
                            <span className=" bg-purple-600 px-1 py-0.5  rounded-xl text-white select-none">C{caseDetail.id}</span>
                            <div className="ml-2 inline-block">{caseDetail.title}</div>
                        </div>
                        <div>
                            <Link
                                to={`/case/edit/${projectId}/${caseId}`}
                                className="flex gap-1 items-center text-sm border border-[#aecade] px-3 py-0.5">
                                <CiEdit className="text-[#aecade]" />
                                Edit</Link>
                        </div>

                    </div>
                    <div className="p-3 w-full">
                        <div className="text-left border-b px-4 py-2 font-medium">Section name</div>

                        <div className="grid grid-cols-4 bg-[#F6FBFF] p-3 border border-[#aecade]">
                            <div className="text-left text-sm">
                                <div className="font-bold">Type</div>
                                <div>{caseDetail.type && caseDetail.type.name}</div>
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-bold">Priority</div>
                                <div>{caseDetail.priority && caseDetail.priority.name}</div>
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-bold">Estimate</div>
                                <div>{caseDetail.estimate}</div>
                            </div>

                        </div>

                        {isAllDataEmpty ?
                            <>
                                <p className="text-left text-sm py-2"><em>No additional details available.</em></p>
                            </>
                            :
                            <div>
                                {caseDetail.description && <CaseDetailBox title={"Description"} data={caseDetail.description} />}
                                {caseDetail.precondition && <CaseDetailBox title={"Description"} data={caseDetail.precondition} />}
                                {caseDetail.step && <CaseDetailBox title={"Description"} data={caseDetail.step} />}
                                {caseDetail.expectation && <CaseDetailBox title={"Description"} data={caseDetail.expectation} />}
                            </div>
                        }
                    </div>
                   


                </div>

                <div className="bg-[#d2e2ed] w-64 ">
                    <div className="w-full text-sm">
                        <div className="flex gap-2 items-center">
                            <span className="w-full h-px border-b border-[#aecade]"></span>
                        </div>
                        <div className="text-left text-[#376789] font-medium py-10">
                            <div className="hover:bg-[#eaf1f7] px-2 py-1 border-l-2 border-[#376789] ">
                                <Link className="w-full inline-block ">Detail</Link>
                            </div>
                            <div className="hover:bg-[#eaf1f7] px-2 py-1">
                                <Link className="w-full inline-block ">Test &  Result</Link>
                            </div>
                            <div className="hover:bg-[#eaf1f7] px-2 py-1">
                                <Link className="w-full inline-block ">History</Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 w-full text-sm text-left">
                        <div className="flex gap-2 items-center">
                            <p className="inline-block w-full font-medium">People & Status</p>
                            <span className="w-full h-px border-b border-[#aecade]"></span>
                        </div>
                        <div className="bg-white table w-full text-left mt-2 p-2 text-sm">
                            <div className="table-row w-full">
                                <div className="table-cell w-18 py-1 text-gray-400">Created</div>
                                <div className="table-cell">{caseDetail.created_by && caseDetail.created_by.username}</div>
                            </div>
                            <div className="table-row">
                                <div className="table-cell py-1"></div>
                                <div className="table-cell ">{moment.utc(caseDetail.created_date).format('DD/MM/YYYY HH:mm:ss')}</div>
                            </div>
                            <div className="table-row w-full">
                                <div className="table-cell w-18 py-1 text-gray-400">Updated</div>
                                <div className="table-cell">{caseDetail.updated_by && caseDetail.updated_by.username}</div>
                            </div>
                            <div className="table-row">
                                <div className="table-cell py-1"></div>
                                <div className="table-cell ">{moment.utc(caseDetail.updated_date).format('DD/MM/YYYY HH:mm:ss')}</div>
                            </div>
                        </div>
                    </div>
                </div>
               
                </div>
            

        </>
    )
}
export default CaseDetail;