import React, { useCallback, useState } from "react";
import { FaCheck, FaXmark, FaRegCopy, FaTag } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFillExplicitFill } from "react-icons/bs";
import { FcDeleteRow } from "react-icons/fc";
import { SiRedmine } from "react-icons/si";
import { useCase } from "../../Store/CaseContext";
import { Link } from "react-router-dom";

// const CaseTable = React.memo(({ projectId, data, setModals, handleCopy, setCaseTitleModal, setCaseExpectationModal, sectionId, setCaseDelModal, setRmTaskModal }) => {
const CaseTable = React.memo((props) => {

    const {
        projectId,
        data,
        setModals,
        handleCopy,
        setCaseTitleModal,
        setCaseExpectationModal,
        sectionId,
        setRmTaskModal,
        setTagModal,
        setCaseDelModal
    } = props;

    const urlWEB = process.env.REACT_APP_WEB_URL;
    const [isCheckAll, setIsCheckAll] = useState(false);
    const { setSelectedCaseId } = useCase();

    const convertStr2Array = (str) => {
        if (!str) {
            return [];
        }
        return str.split(',').map(item => item.trim());
    }

    // Memoized function to prevent re-creation on each render
    const handleClickExp = useCallback((caseId, exp) => {
        setModals((prevModals) => ({
            ...prevModals,
            caseExpectationModal: {
                showModal: true,
                expectation: exp,
                caseId: caseId
            }
        }))

        setSelectedCaseId(caseId);

    }, [setCaseExpectationModal, setSelectedCaseId]);

    const handleClickEditTitle = useCallback((caseId, title) => {
        setCaseTitleModal({
            'showModal': true,
            'title': title,
            'caseId': caseId
        });
        setSelectedCaseId(caseId);
    }, [setCaseTitleModal, setSelectedCaseId]);

    const handeClickRm = useCallback((caseId) => {
        setRmTaskModal({
            'showModal': true,
            'caseId': caseId
        });
    }, [setRmTaskModal]);

    const handleClickTag = useCallback((caseId) => {
        setTagModal({
            'showModal': true,
            'caseId': caseId
        });
    }, [setTagModal]);

    return (
        <>
            <div className="w-full">
                <table className="w-full font-thin text-sm">
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input
                                    id={`check-case-all-${sectionId}`}
                                    type="checkbox"
                                    checked={isCheckAll}
                                    onChange={() => setIsCheckAll(!isCheckAll)}
                                />
                            </th>
                            <th className="w-10 text-center py-1">#</th>
                            <th className="w-14 text-center py-1">ID</th>
                            <th className="text-left px-2">Title</th>
                            <th className="text-center px-2">Tags</th>
                            <th className="text-center w-32 px-2">Expectation</th>
                            <th className="text-center w-36">Priority</th>
                            <th className="text-center w-24">Rm</th>
                            <th className="text-center w-20">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) => (
                            <tr className="border border-gray-200 py-0.5 hover:bg-blue-100 group" key={ele.id}>
                                <td>
                                    <input id={`check-case-${ele.id}`} name={`check-case-${ele.id}`} type="checkbox" />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <a className="text-[#5993bc] hover:underline hover:text-[#1E201E]" href={`${urlWEB}case/view/${projectId}/${ele.id}`}>
                                        C{ele.id}
                                    </a>
                                </td>
                                <td>
                                    {ele.active === 1 ? (
                                        <div className="px-2 py-1 text-left flex gap-1 items-center">
                                            <Link
                                                className="text-[#5993bc] hover:underline hover:text-[#1E201E]"
                                                to={`${urlWEB}cases/view/${ele.id}`}
                                            >
                                                {ele.title}
                                            </Link>
                                            <button className="opacity-0 group-hover:opacity-100" onClick={() => handleClickEditTitle(ele.id, ele.title)}>
                                                <CiEdit />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-2 py-1 text-left flex gap-1 items-center">
                                            <FcDeleteRow />
                                            <Link
                                                className="text-[#5993bc] hover:underline hover:text-[#1E201E] opacity-50"
                                                to={`${urlWEB}cases/view/${ele.id}`}>
                                                {ele.title}
                                            </Link>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div>
                                        <span 
                                        className="border border-[#87A2FF] rounded-2xl px-2 py-0.5 text-xs cursor-pointer bg-white hover:bg-[#87A2FF] hover:text-white"
                                        onClick={() => setTagModal({
                                            'showModal': true,
                                            'caseId': ele.id,
                                            'caseTitle': ele.title,
                                            'tags': ele.tags
                                        })}
                                        >
                                            {ele.tags ? convertStr2Array(ele.tags).length : 0} tags
                                        </span>
                                    </div>
                                </td>

                                <td>
                                    {ele.expectation === '' ? (
                                        <div className="flex gap-1 items-center hover:underline cursor-pointer" onClick={() => handleClickExp(ele.id, ele.expectation)}>
                                            <FaCheck className="text-gray-200" /> No expectation
                                        </div>
                                    ) : (
                                        <div className="flex gap-1 items-center text-[#5993bc] hover:underline cursor-pointer" onClick={() => handleClickExp(ele.id, ele.expectation)}>
                                            <FaCheck className="text-green-500" /> Has expectation
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <div className={`${ele.active === 0 && 'opacity-50'}`}>{ele.priority_name}</div>
                                </td>
                                <td>
                                    <button onClick={() => handeClickRm(ele.id)}>
                                        <SiRedmine className={`${ele.rmtask_count > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                                    </button>
                                </td>
                                <td className="">
                                    {ele.active === 1 && (
                                        <div name="action" className="flex gap-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
                                            <Link to={`/cases/edit/${ele.id}`} className="">
                                                <CiEdit />
                                            </Link>
                                            <button type="button">
                                                <FaXmark className="bg-red-500 border border-red-500 rounded-full text-white cursor-pointer opacity-80 hover:opacity-100" 
                                                onClick={() => setCaseDelModal({
                                                    'showModal': true,
                                                    'caseId': ele.id,
                                                    'caseTitle': ele.title
                                                })}
                                                 />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
});

export default CaseTable;
