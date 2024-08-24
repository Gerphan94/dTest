import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from 'react-router-dom';
import CaseDetailBox from "./CaseDetailBox";
import { CiEdit } from "react-icons/ci";

function CaseDetail() {

    const { projectId, caseId } = useParams()

    console.log('caseID is ',caseId, projectId)

    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseDetail, setCaseDetail] = useState({});

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-case/" + caseId);
                const data = await response.json();
                setCaseDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, [caseId])

    return (
        <>
         
            <div className="flex w-full h-body-page mt-20">
                <div className='w-full'>
                    <div className="border-b border-gray-300 p-2 flex justify-between">
                        <div className="ml-3 font-bold text-md">
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
                                <div>{caseDetail.type}</div>
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-bold">Priority</div>
                                <div>{caseDetail.priority}</div>
                            </div>
                            <div className="text-left text-sm">
                                <div className="font-bold">Estimate</div>
                                <div>{caseDetail.estimate}</div>
                            </div>
                            
                        </div>
                        <div>
                        <CaseDetailBox title={"Description"} data={caseDetail.description} />
                        <CaseDetailBox title={"Precondition"} data={caseDetail.precondition} />
                        <CaseDetailBox title={"Step"} data={caseDetail.step} />
                        <CaseDetailBox title={"Expectation"} data={caseDetail.expectation} />
                        <CaseDetailBox title={"Step"} />
                        </div>
                    </div>


                </div>

                <div className="bg-[#d2e2ed] w-64 text-white"></div>
            </div>
            
        </>
    )
}
export default CaseDetail;