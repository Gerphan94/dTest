import React, { useState, useCallback, createContext, useContext } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import SectionCaseTable from "./SectionCaseTable";
import CaseTitleModal from "./Modal/CaseTitleModal";
import { TiDelete } from "react-icons/ti";
import { PiClipboardTextLight } from "react-icons/pi";
import CaseExpectationModal from "./Modal/CaseExpectationModal";
import CaseDelModal from "./Modal/CaseDelModal";
import RmTaskModal from "./Modal/RmTaskModal";

const SectionCase = React.forwardRef((props, ref) => {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const sectionId = props.data.section_id;
    const loggin_id = props.logginUser.id

    const [sectionName, setSectionName] = useState(props.data.section_name)
    const [caseTotal, setCaseTotal] = useState(props.data.case_count);
    const [caseData, setCaseData] = useState(props.data.cases);
    const [isShowCaseForm, setisShowCaseForm] = useState(false);
    // delte info
    const [showDeleteSection, setShowDeleteSection] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');



    const [caseDelModal, setCaseDelModal] = useState({
        'showModal': false,
        'caseId': null
    });
    const [caseTitleModal, setCaseTitleModal] = useState({
        'showModal': false,
        'title': '',
        'caseId': null
    });

    const [caseExpectationModal, setCaseExpectationModal] = useState({
        'showModal': false,
        'expectation': '',
        'caseId': null
    });


    const [rmTaskModal, setRmTaskModal] = useState({
        'showModal': false,
        'caseId': null
    });

    const fetchGetCaseDataBySection = async (section_Id) => {
        try {
            const response = await fetch(urlAPI + '/api/get-cases-by-section/' + section_Id);
            if (response.ok) {
                const data = await response.json();
                setCaseTotal(data.length);
                setCaseData(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


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
            formJson['user_id'] = loggin_id

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
                    fetchGetCaseDataBySection(sectionId);
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
                body: JSON.stringify({ 'case_id': case_id, 'user_id': loggin_id }),
            });
            if (response.ok) {
                const data = await response.json();
                setCaseTotal(caseTotal + 1);
                setCaseData(prevData => [...prevData, { "case_id": data.id, "case_title": data.title, "priority_name": "Medium" }]);
            }
            else {
                console.error('Error:', response.json());
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }

    const handleCopy2Clipboard = () => {
        let copied_data = '';
        caseData.forEach((data) => {
            console.log(data)
            copied_data = copied_data + data.title + '\t' + data.expectation + '\n';
        })
        console.log(copied_data)
        navigator.clipboard.writeText(copied_data);
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
            <div className="flex mb-2 w-full group ">
                <div className="text-left font-medium">{sectionName}</div>
                <div className="ml-2 flex items-center flex-wrap">
                    <span className="w-6 h-5 boder border-blue-50 bg-blue-300 rounded-xl text-white select-none">
                        {caseTotal}
                    </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100">
                    <button data-tip="Edit" className="ml-4 text-blue-600"
                        onClick={() => handleClickEditSection()}
                    >
                        <CiEdit />
                    </button>
                    <button className="ml-1 text-red-500" onClick={() => handleClickSectionDel()}>
                        <TiDelete />
                    </button>
                    <button className="ml-1 text-blue-500" onClick={() => handleCopy2Clipboard()}>
                        <PiClipboardTextLight />
                    </button>
                </div>
            </div>
            <div>
                <SectionCaseTable
                    projectId={props.projectId}
                    data={caseData}
                    handleCopy={handleCopyCase}
                    setCaseTitleModal={setCaseTitleModal}
                    setCaseExpectationModal={setCaseExpectationModal}
                    setCaseDelModal={setCaseDelModal}
                    setRmTaskModal={setRmTaskModal}
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

            {caseExpectationModal.showModal &&
                <CaseExpectationModal
                    caseExpectationModal={caseExpectationModal}
                    setCaseExpectationModal={setCaseExpectationModal}
                    fetchCaseData={fetchGetCaseDataBySection}
                    sectionId={sectionId}
                />
            }

            {caseTitleModal.showModal &&
                <CaseTitleModal
                    caseTitleModal={caseTitleModal}
                    setCaseTitleModal={setCaseTitleModal}
                    fetchCaseData={fetchGetCaseDataBySection}
                    sectionId={sectionId}
                />
            }

            {caseDelModal.showModal &&
                <CaseDelModal
                    setCaseDelModal={setCaseDelModal}
                    caseDelModal={caseDelModal}
                    fetchCaseData={fetchGetCaseDataBySection}
                    sectionId={sectionId}

                />}

            {rmTaskModal.showModal &&
                <RmTaskModal
                    setRmTaskModal={setRmTaskModal}
                    rmTaskModal={rmTaskModal}
                    fetchCaseData={fetchGetCaseDataBySection}
                    sectionId={sectionId}
                />
            }


        </div>



    )



});
export default SectionCase;