import React, { useCallback, useState } from "react";
import { FaCheck, FaXmark, FaRegCopy } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFillExplicitFill } from "react-icons/bs";
import { FcDeleteRow } from "react-icons/fc";
import { SiRedmine } from "react-icons/si";
import { useCase } from "../../Store/CaseContext";

const CaseTable = React.memo(({ projectId, data, handleCopy, setCaseTitleModal, setCaseExpectationModal,sectionId, setCaseDelModal, setRmTaskModal }) => {
  
    const urlWEB = process.env.REACT_APP_WEB_URL;
    const [isCheckAll, setIsCheckAll] = useState(false);
    const { setSelectedCaseId } = useCase();

    // Memoized function to prevent re-creation on each render
    const handleClickExp = useCallback((caseId, exp) => {
        setCaseExpectationModal({
            'showModal': true,
            'expectation': exp,
            'caseId': caseId
        });
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

    const handleClickDelCase = useCallback((caseId) => {
        setCaseDelModal({
            'showModal': true,
            'caseId': caseId
        });
    }, [setCaseDelModal]);

    const handeClickRm = useCallback((caseId) => {
        setRmTaskModal({
            'showModal': true,
            'caseId': caseId
        });
    }, [setRmTaskModal]);

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
                                            <a className="text-[#5993bc] hover:underline hover:text-[#1E201E]" href={`${urlWEB}cases/view/${projectId}/${ele.id}`}>
                                                {ele.title}
                                            </a>
                                            <button className="opacity-0 group-hover:opacity-100" onClick={() => handleClickEditTitle(ele.id, ele.title)}>
                                                <CiEdit />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-2 py-1 text-left flex gap-1 items-center">
                                            <FcDeleteRow />
                                            <a className="text-[#5993bc] hover:underline hover:text-[#1E201E] opacity-50" href={`${urlWEB}cases/view/${projectId}/${ele.id}`}>
                                                {ele.title}
                                            </a>
                                        </div>
                                    )}
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
                                        <div name="action" className="flex gap-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
                                            <button className="mr-2" onClick={() => handleCopy(ele.id)}>
                                                <FaRegCopy className="text-blue-500" />
                                            </button>
                                            <button className="mr-2">
                                                <CiEdit />
                                            </button>
                                            <button type="button">
                                                <FaXmark className="bg-red-500 border border-red-500 rounded-full text-white cursor-pointer opacity-80 hover:opacity-100" onClick={() => handleClickDelCase(ele.id)} />
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
