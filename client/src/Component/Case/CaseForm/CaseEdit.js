import React, { useEffect, useState } from "react";
import CaseForm from "./CaseForm";
import { useGlobalVariables } from "../../../Store/AppContext";
import { useParams } from "react-router-dom";

function CaseEdit(props) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const { projectId, caseId } = useParams();

    const [caseDetail, setCaseDetail] = useState({});

    useEffect(() => {
        const fetchUrl = urlAPI + "api/get-case-by-id/" + caseId;
        const fetchCaseDetail = async () => {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setCaseDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchCaseDetail();

    }, [caseId])


return (
    <>
        <div className='mt-20'>
            <div className="flex">
                <div className="w-full h-full bg-[#EAF1F7]">
                    <div className="text-left border-b px-4 py-2 font-medium">
                        Edit Test Case
                    </div>
                    <div>
                        <CaseForm
                            projectId={projectId}
                            formType='edit'
                            caseData={caseDetail}
                            caseId={caseId}

                        />
                    </div>
                </div>
                <div className="w-64 bg-[#D2E2ED]">

                </div>
            </div>


        </div>
    </>
);
}
export default CaseEdit;