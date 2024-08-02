import React, { useState, useCallback } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import SectionModalAdd from "./SectionAddModal";
import SectionModalEdit from "./SectionModalEdit";
import DeleteSectionConfirm from "../MessageBox/DeleteSectionConfirm";
import SectionCaseTable from "./SectionCaseTable";

function SectionCase({ data, curModule }) {
    console.log("-----------", data.cases)
    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const section_id = data.section_id;
    const module_id = curModule;
    const [sectionName, setSectionName] = useState(data.section_name)
    const [caseTotal, setCaseTotal] = useState(data.case_count);
    const [caseData, setCaseData] = useState(data.cases);
    const [isShowCaseForm, setisShowCaseForm] = useState(false);
    const [NewSectionModalShow, setNewSectionModalShow] = useState(false);
    const [EditSectionModalShow, setEditSectionModalShow] = useState(false);
    // delte info
    const [showDeleteSection, setShowDeleteSection] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const priorityOptions = [
        { label: "Low", value: 1 },
        { label: "Medium", value: 2 },
        { label: "High", value: 3 },
        { label: "Critical", value: 4 }
    ]
    // 

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            formJson['description'] = ''
            formJson['precondition'] = ''
            formJson['step'] = ''
            formJson['expectation'] = ''
            formJson['priority'] = 2
            formJson['estimate'] = 0
            try {
                const response = await fetch(urlAPI + 'api/add-case/' + section_id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    setisShowCaseForm(false);
                    setCaseTotal(caseTotal + 1);
                    setCaseData(prevData => [...prevData, { "case_id": data.id, "case_title": data.title, "priority_name": "Medium" }]);

                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
        [section_id] // Dependency array is empty because there are no dependencies
    );

    const handleClickSectionDel = () => {
        setShowDeleteSection(true);
        setDeleteType("section_delete");
        setDeleteMessage(sectionName);
    };
    const handleClickCaseDel = (case_name) => {
        setShowDeleteSection(true);
        setDeleteType("case_delete");
        setDeleteMessage(case_name);
    };

    return (
        <div className="mb-6">
            <div className="flex mb-2">
                <div className="text-left font-bold text-md">{sectionName}</div>
                <div className="ml-2 flex items-center flex-wrap">
                    <span className="w-6 h-5 boder border-blue-50 bg-blue-300 rounded-xl text-white select-none">
                        {caseTotal}
                    </span>
                </div>
                <button className="ml-4 text-blue-600" onClick={() => setEditSectionModalShow(true)}>
                    <CiEdit />
                </button>
                <button className="ml-1 text-red-500" onClick={() => handleClickSectionDel()}>
                    <FaXmark />
                </button>
            </div>
            <div>
                <SectionCaseTable data={caseData} />
            </div>
            <div className="flex gap-2 mt-4">
                {isShowCaseForm ?
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                        <div className="flex items-center gap-2">
                            <div>Title</div>
                            <input
                                type="text"
                                className="rounded-md border outline-none px-2 py-1 w-[600px]"
                                name="case_title"
                                required={true}
                            />
                            <button type="submit">
                                <FaCheck
                                    className="bg-green-600 border border-green-600 p-1 text-white size-full rounded-sm cursor-pointer opacity-80 hover:opacity-100"
                                />
                            </button>
                            <button type="button">
                                <FaXmark
                                    className="bg-white border border-red-500 p-1 text-red-500 size-full rounded-sm cursor-pointer opacity-80 hover:opacity-100"
                                    onClick={() => setisShowCaseForm(false)}
                                />
                            </button>
                        </div>
                    </form>
                    :
                    <div className="flex gap-2">
                        <button className="text-[#5993bc] underline" onClick={() => setisShowCaseForm(true)}>Add Case</button>
                        <div>|</div>
                        <button className="text-[#5993bc] underline" onClick={() => setNewSectionModalShow(true)}>Add Subsection</button>
                    </div>
                }
            </div>

            {NewSectionModalShow &&
                <SectionModalAdd 
                parentSectionId={section_id} 
                level={data["section_level"] + 1} 
                curModule={module_id} 
                setNewSectionModalShow={setNewSectionModalShow} 
                setCaseData={data.setCaseData} />
            }
            {EditSectionModalShow &&
                <SectionModalEdit
                    section_id={data.section_id}
                    section_name={sectionName}
                    section_des={data.section_des}
                    setEditSectionModalShow={setEditSectionModalShow}
                    data={data}
                    setSectionName={setSectionName}
                />
            }

            {showDeleteSection &&
                <DeleteSectionConfirm
                    setShowModal={setShowDeleteSection}
                    section_id={section_id}


                />
            }

        </div>



    )



}
export default SectionCase;