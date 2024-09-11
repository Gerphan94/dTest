import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";

import CaseSelectTable from "./CaseSelectTable";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function CaseSelectModal({ runId, setShowModal, project_id, user_id }) {


    const urlAPI = process.env.REACT_APP_API_URL;

    const [availableSave, setAvailableSave] = useState(false);
    const { logginUser } = useGlobalVariables();

    const [sections, setSections] = useState([]);
    const [data, setData] = useState([]);

    const [caseViews, setCaseViews] = useState([]);

    const [selectedSection, setSelectedSection] = useState({ id: null, name: '' });


    const [selectedCases, setSelectedCases] = useState([]);



    useEffect(() => {
        // const fetchSections = async () => {
        //     try {
        //         const response = await fetch(urlAPI + "api/get-section-list/" + project_id);
        //         const data = await response.json();
        //         setSections(data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };
        const getCases = async () => {
            try {
                const response = await fetch(urlAPI + "run-api/get-cases-by-project-id/" + project_id);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        // fetchSections();
        getCases();
    }, [project_id])


    // FUNCTION //////////////////////////////////////////////

    const countCheckedCase = (cases) => {

        let checkedCount = 0;

        if (cases.length === 0) return 0;

        cases.forEach(caseItem => {
            if (caseItem.checked) checkedCount++;
        });
        console.log(checkedCount)
        return checkedCount


    };
    const updateCheckallForSections = (section) => {
        section.check_count = countCheckedCase(section.cases);

        if (section.sub && section.sub.length > 0) {
            section.sub.forEach(subSection => {
                updateCheckallForSections(subSection);
            });

            section.check_count = section.sub.every(subSection => subSection.check_count);
        }
    };


    //////////////////////////////////////////////


    const handleClickSection = async (id, name) => {
        setSelectedSection({ id, name });
        const findSectionById = (sections, id) => {
            for (let section of sections) {
                if (section.section_id === id) {
                    return section;
                }
                if (section.sub && section.sub.length > 0) {
                    const foundInSub = findSectionById(section.sub, id);
                    if (foundInSub) {
                        return foundInSub;
                    }
                }
            }
            return null;
        };
        const getCaseBySection = findSectionById(data, id);
        if (getCaseBySection) {
            setCaseViews(getCaseBySection.cases || []);
        } else {
            setCaseViews([]);
        }
    };

    const handleCaseCheckAll = (sectionId, checkstatus) => {
        const updatedSections = [...data];
        const findAndUpdateCase = (sections) => {
            sections.forEach(section => {
                if (section.section_id === sectionId) {

                    section.cases = section.cases.map(c => ({ ...c, checked: checkstatus }));
                    section.check_count = countCheckedCase(section.cases);
                }

                if (section.sub && section.sub.length > 0) {
                    findAndUpdateCase(section.sub);
                }
            });
        };
        findAndUpdateCase(updatedSections);
        setData(updatedSections);
    }

    const handleCaseCheck = (sectionId, caseId) => {
        const updatedSections = [...data];
        const findAndUpdateCase = (sections) => {
            sections.forEach(section => {
                if (section.section_id === sectionId) {
                    console.log('Checking ', sectionId, section.cases, caseId)
                    section.cases = section.cases.map(c =>
                        c.id === caseId ? { ...c, checked: !c.checked } : c
                    );
                    section.check_count = countCheckedCase(section.cases);
                }

                if (section.sub && section.sub.length > 0) {
                    findAndUpdateCase(section.sub);
                }
            });
        };

        findAndUpdateCase(updatedSections);
        setData(updatedSections);

    };







    const closeModal = () => {
        setShowModal(false)
    }


    const renderSections = (data) => {
        return data.map((section) => (
            <ul key={section.section_id} className="">
                <li
                    className="w-full text-left flex gap-2 px-2 items-center py-0.5 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                    onClick={() => handleClickSection(section.section_id, section.section_name)}
                >
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={section.checkall}
                    />
                    {section.section_name}
                    <div className="flex">
                        <span className=" " >{section.check_count}</span> /
                        <span className="text-blue-400">{section.case_count}</span>

                    </div>
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

    const checkByCase = (id) => {
        console.log('change', id)
        setData(data.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const getCheckedCase = () => {
            const checkArr = [];
            const checkedData = [...data];
            const findCheckedCase = (sections) => {
                sections.forEach((section) => {
                    section.cases.forEach(c => {
                        if (c.checked) {
                            checkArr.push(c.id);
                        }
                    });
                    if (section.sub && section.sub.length > 0) {
                        findCheckedCase(section.sub);
                    }
                });
            };
            findCheckedCase(checkedData);
            return checkArr;
        };

        const checkedArray = getCheckedCase(data)
        if (checkedArray.length > 0) {
            try {
                const response = await fetch(urlAPI + 'run-api/init-run-cases/' + runId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'cases': checkedArray, 'user_id': user_id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    closeModal();
                }
            }
            catch (error) {
                console.error('Error:', error.message);
            }
        }
            
    }

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
                            <div className="relative p-6 text-left text-sm flex gap-0 h-[450px] min-h-96 ">

                                <div className="w-1/3 bg-[#EAF1F7] border border-[#7dabcb] overflow-y-auto" >
                                    {renderSections(data)}

                                </div>
                                <div className="w-2/3 border border-[#7dabcb] border-l-0 p-2 overflow-y-auto">
                                    <p><strong>{selectedSection.name}</strong></p>
                                    <CaseSelectTable
                                        sectionId={selectedSection.id}
                                        cases={caseViews}
                                        handleCaseCheck={handleCaseCheck}
                                        handleCaseCheckAll={handleCaseCheckAll} />

                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                                <BtnOK onClik={() => handleSubmit()} />
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