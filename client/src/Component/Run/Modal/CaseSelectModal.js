import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";

function CaseSelectModal({ setShowModal, project_id }) {


    const urlAPI = process.env.REACT_APP_API_URL;

    const [availableSave, setAvailableSave] = useState(false);
    const { logginUser } = useGlobalVariables();

    const [sections, setSections] = useState([]);


    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-section-list/" + project_id);
                const data = await response.json();
                setSections(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();
    })
    // const urlWEB = process.env.REACT_APP_WEB_URL;

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const renderSections = (sections) => {
        return sections.map((section) => (
            <ul key={section.id} className="">

                <li
                    className="w-full text-left block px-2 py-0.5 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                // onClick={() => handleClick(section.id, section.name)}
                >
                    <input 
                        type="checkbox"
                        className="mr-1"
                    />
                    {section.name}
                </li>

                {
                    section.sub && section.sub.length > 0 && (
                        <div className=" border-gray-300 ml-3">
                            {renderSections(section.sub)}
                        </div>
                    )
                }
            </ul>
        ));
    };

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-2/3 md:w-1/2 w-full my-6 mx-auto h-3/4 p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none' spellCheck="false">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                                <div className="text-lg font-semibold select-none">
                                    Select Cases
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm flex gap-0 h-[600px] min-h-96 ">

                                <div className="w-1/2 bg-[#EAF1F7] border border-[#7dabcb] overflow-y-auto" >
                                    {renderSections(sections)}

                                </div>
                                <div className="w-1/2 border border-[#7dabcb] border-l-0">


                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                                {availableSave ? <BtnOK /> : <BtnOKDisabled />}
                                <BtnCancel onClick={() => closeModal()} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>
        </div>
    )
}

export default CaseSelectModal;