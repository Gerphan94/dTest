import React from "react";
import { FaCheck, FaXmark, FaRegCopy } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

function CaseTable({ data, handleCopy }) {

    const urlWEB = process.env.REACT_APP_WEB_URL;

  

    return (
        <>
            <div className="w-full">
                <table className="w-full font-thin text-sm">
                    <thead className="">
                        <tr>
                            <th className="w-10 text-center py-1">#</th>
                            <th className="w-14 text-center py-1">ID</th>
                            <th className="text-left px-2">Title</th>
                            <th className="text-center w-36">Priority</th>
                            <th className="text-center w-20">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) =>
                            <tr className="border border-gray-200 py-0.5 hover:bg-blue-100 group" key={ele.case_id}>
                                <td>{index + 1}</td>
                                <td>C{ele.case_id}</td>
                                <td>
                                    <div className="px-2 py-1 text-left flex items-center">
                                        <a className="text-[#5993bc] hover:underline" href={`${urlWEB}case/view/${ele.case_id}`}>
                                            {ele.case_title}
                                        </a>
                                        <button className="opacity-0 group-hover:opacity-100"><CiEdit /></button>
                                    </div>
                                </td>
                                <td><div>{ele.priority_name}</div>

                                </td>
                                <td className="">
                                    <div name="action" className="flex gap-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
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
                                            // onClick={() => handleClickCaseDel(ele.case_title)}
                                            />
                                        </button>

                                    </div>

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