import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
function CaseTable( {data} ) {

    const urlWEB = process.env.REACT_APP_WEB_URL;

    return(
        <>
            <div className="w-full">
                <table className="w-full font-thin text-sm">
                    <thead className="">
                        <tr>
                            <th className="w-20 text-center py-1">#</th>
                            <th className="text-left px-2">Title</th>
                            <th className="text-center w-36">Priority</th>
                            <th className="text-center w-20">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) =>
                            <tr className="border border-gray-200 py-1 hover:bg-blue-100" key={ele.case_id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="px-2 py-1 text-left">
                                        <a className="hover:underline" href={`${urlWEB}case/view/${ele.case_id}`}>
                                        {ele.case_title}
                                        </a>
                                    </div>
                                </td>
                                <td><div>{ele.priority_name}</div>
                                    
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