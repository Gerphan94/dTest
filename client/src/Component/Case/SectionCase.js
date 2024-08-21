import React, { useState, useCallback } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import SectionModalAdd from "./SectionModal";
import SectionModalEdit from "./SectionModalEdit";
import DeleteSectionConfirm from "../MessageBox/DeleteSectionConfirm";
import SectionCaseTable from "./SectionCaseTable";
import CaseTitleModal from "./CaseTitleModal";

const SectionCase = React.forwardRef((props, ref) => {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const sectionId = props.data.section_id;
    const logginUser_id = props.logginUser.id

    const [sectionName, setSectionName] = useState(props.data.section_name)
    const [caseTotal, setCaseTotal] = useState(props.data.case_count);
    const [caseData, setCaseData] = useState(props.data.cases);
    const [isShowCaseForm, setisShowCaseForm] = useState(false);
    // delte info
    const [showDeleteSection, setShowDeleteSection] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const [showCaseTitleModal, setShowCaseTitleModal] = useState(false);

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
            formJson['case_type'] = 1
            formJson['user_id'] = logginUser_id
            
            try {
                const response = await fetch(urlAPI + 'api/add-case/' + sectionId, {
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
        [sectionId] // Dependency array is empty because there are no dependencies
    );

    const handleClickAddSection = () => {
        props.setSectionModal({
            'show': true,
            'type': 'insert',
            'formData': {
                'name': '',
                'description': '',
                'project_id': props.projectId,
                'parent_id': sectionId
            }
        })
    };

    const handleClickEditSection = () => {
        props.setSectionModal({
            'show': true,
            'type': 'edit',
            'formData': {
                'id': sectionId,
                'name': sectionName,
                'description': '',
            }
        })
    };

    const handleCopyCase = async (case_id) => {
        try {
            const response = await fetch(urlAPI + 'api/copy-case', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'case_id': case_id }),
            });
            if (response.ok) {
                const data = await response.json();
                setCaseTotal(caseTotal + 1);
                setCaseData(prevData => [...prevData, { "case_id": data.id, "case_title": data.title, "priority_name": "Medium" }]);
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }



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
        <div className="mb-6 text-sm " ref={ref}>
            <div className="flex mb-2">
                <div className="text-left font-bold">{sectionName}</div>
                <div className="ml-2 flex items-center flex-wrap">
                    <span className="w-6 h-5 boder border-blue-50 bg-blue-300 rounded-xl text-white select-none">
                        {caseTotal}
                    </span>
                </div>
                <button className="ml-4 text-blue-600"
                    onClick={() => handleClickEditSection()}
                >
                    <CiEdit />
                </button>
                <button className="ml-1 text-red-500" onClick={() => handleClickSectionDel()}>
                    <FaXmark />
                </button>
            </div>
            <div>
                <SectionCaseTable 
                data={caseData} 
                handleCopy={handleCopyCase}
                setShowCaseTitleModal={setShowCaseTitleModal}
                 />
            </div>
            <div className="flex gap-2 mt-4">
                {isShowCaseForm ?
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='off' spellCheck='false'>
                        <div className="flex items-center gap-2">
                            <div className="text-gray-400">Case Title:</div>
                            <input
                                type="text"
                                className="border outline-none px-2 py-0.5 w-[600px]"
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
                        <button
                            className="text-[#5993bc] underline"
                            onClick={() => handleClickAddSection()}
                        >Add Subsection</button>
                    </div>
                }
            </div>

            {showDeleteSection &&
                <DeleteSectionConfirm
                    setShowModal={setShowDeleteSection}
                    section_id={sectionId}
                />
            }

            {showCaseTitleModal &&
                <CaseTitleModal
                    setShowModal={setShowCaseTitleModal}
                />
            }

        </div>



    )



});
export default SectionCase;