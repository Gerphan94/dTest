import React, { useParams, Link, useState, useEffect } from "react";
import { FaCheck, FaXmark, FaRegCopy } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsFillExplicitFill } from "react-icons/bs";
import { FcDeleteRow } from "react-icons/fc";



import { IconBtnEdit } from "../Common/IconButton";

function CaseTable({ projectId, data, handleCopy, setCaseTitleModal, setCaseExpectationModal, setCaseDelModal }) {

    const urlWEB = process.env.REACT_APP_WEB_URL;

    const [showExpCaseModal, setShowExpCaseModal] = useState(false);
    const [showTitleCaseModal, setShowTitleCaseModal] = useState(false);
    const [selectedCaseId, setSelectedCaseId] = useState(0);
    const [selectedExp, setSelectedExp] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');

    const [isCheckAll, setIsCheckAll] = useState(false);

    const handleClickExp = (caseId, exp) => {
        setCaseExpectationModal({
            'showModal': true,
            'expectation': exp,
            'caseId': caseId
        })
    }
    const handleClickEditTitle = (caseId, title) => {
        setCaseTitleModal({
            'showModal': true,
            'title': title,
            'caseId': caseId
        })
    }

    const handleClickDelCase = (caseId) => {
        setCaseDelModal({
            'showModal': true,
            'caseId': caseId
        })
    }

    return (
        <>
            <div className="w-full">
                <table className="w-full font-thin text-sm">
                    <thead className="">
                        <tr>
                            <th className="w-10">
                                <input
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
                            <th className="text-center w-20">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) =>
                            <tr className="border border-gray-200 py-0.5 hover:bg-blue-100 group" key={ele.case_id}>
                                <td>
                                    <input
                                        type="checkbox"
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <a className="text-[#5993bc] hover:underline hover:text-[#1E201E] " href={`${urlWEB}case/view/${projectId}/${ele.case_id}`}>
                                        C{ele.case_id}
                                    </a>
                                </td>
                                <td>
                                    {ele.active === 1 ?
                                        <div className="px-2 py-1 text-left flex gap-1 items-center">
                                            <a className={`text-[#5993bc] hover:underline hover:text-[#1E201E] `} href={`${urlWEB}cases/view/${projectId}/${ele.case_id}`}>
                                                {ele.case_title}
                                            </a>
                                            <button
                                                className="opacity-0 group-hover:opacity-100"
                                                onClick={() => handleClickEditTitle(ele.case_id, ele.case_title)}
                                            ><CiEdit />
                                            </button>
                                        </div>
                                        :
                                        <div className="px-2 py-1 text-left flex gap-1 items-center">
                                            <FcDeleteRow />
                                            <a className={`text-[#5993bc] hover:underline hover:text-[#1E201E] opacity-50 `} href={`${urlWEB}cases/view/${projectId}/${ele.case_id}`}>
                                                {ele.case_title}
                                            </a>
                                        </div>
                                    }

                                </td>
                                <td>
                                    {ele.expectation === '' ?
                                        <div
                                            className="flex gap-1 items-center hover:underline cursor-pointer"
                                            onClick={() => handleClickExp(ele.case_id, ele.expectation)}
                                        >
                                            <FaCheck className="text-gray-200" />
                                            No expectation</div>
                                        :
                                        <div
                                            className="flex gap-1 items-center text-[#5993bc] hover:underline cursor-pointer"
                                            onClick={() => handleClickExp(ele.case_id, ele.expectation)}
                                        >
                                            <FaCheck className="text-green-500" />
                                            Has expectation</div>
                                    }


                                </td>
                                <td><div className={`${ele.active === 0 && 'opacity-50'}`}>{ele.priority_name}</div>

                                </td>
                                <td className="">
                                    {ele.active === 1 &&
                                        <div name="action"
                                            className="flex gap-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">

                                            <button className="mr-2"
                                                onClick={() => handleCopy(ele.case_id)}
                                            >
                                                <FaRegCopy className="text-blue-500"
                                                />
                                            </button>
                                            <button className="mr-2">
                                                <CiEdit />
                                            </button>
                                            <button type="button">
                                                <FaXmark
                                                    className="bg-red-500 border border-red-500 rounded-full text-white cursor-pointer opacity-80 hover:opacity-100"
                                                    onClick={() => handleClickDelCase(ele.case_id)}
                                                />
                                            </button>

                                        </div>
                                    }

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default CaseTable;