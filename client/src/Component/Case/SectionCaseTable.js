import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
function CaseTable( caseData ) {


    return(
        <>
            <div className="w-full">
                <table className="w-full">
                    <thead className="">
                        <tr className="bg-gray-300 border border-gray-300">
                            <th className="w-20 text-center py-1">#</th>
                            <th className="text-left px-2">Title</th>
                            <th className="text-center w-36">Priority</th>
                            <th className="text-center w-20">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caseData && caseData.map((ele, index) =>
                            <tr className="border border-gray-200 py-1 hover:bg-blue-100" key={ele.case_id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="px-2 py-1 text-left">
                                        <a className="hover:underline" href={`${URL}case/view/${ele.case_id}`}>
                                        {ele.case_title}
                                        </a>
                                        
                                    </div>
                                </td>
                                <td>
                                    <select className={`rounded-md px-1 w-24 border border-gray-300`}>
                                        
                                    </select>
                                </td>
                                <td className="">
                                    <button className="mr-2">
                                        <CiEdit />
                                    </button>
                                    <button type="button">
                                        <FaXmark
                                            className="bg-red-500 border border-red-500 rounded-full text-white cursor-pointer opacity-80 hover:opacity-100"
                                            // onClick={() => handleClickCaseDel(ele.case_title)}
                                        />
                                    </button>
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