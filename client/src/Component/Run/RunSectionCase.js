import React, { useState, useCallback, createContext, useContext } from "react";
import StatusDropdown from "./StatusDropdown";

function RunSectionCase({ data, setShowAddResultModal }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;


    // delte info
    return (
        <div className="p-4 mb-6 text-sm ">
            <div className="flex mb-2 w-full group ">
                <div className="text-left font-medium">{data.section_name}</div>
                <div className="ml-2 flex items-center flex-wrap">
                    <span className="w-6 h-5 boder border-blue-50 bg-blue-300 rounded-xl text-white select-none">

                    </span>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100">

                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="w-10">STT</th>
                            <th className="w-20">ID</th>
                            <th className="text-left">Title </th>
                            <th className="text-center">Assigned To </th>

                            <th className="w-20">Trạng thái</th>
                            <th className="w-10"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.cases.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">T{item.runcase_id}</td>
                                <td className="text-left text-[#5993bc]">{item.case_title}</td>
                                <td className="text-center">
                                    {item.assigned_to.username}
                                </td>
                                <td className="text-center py-1 text-xs">

                                    <StatusDropdown
                                        status={item.status}
                                        setShowAddResultModal={setShowAddResultModal}
                                        runCaseId={item.runcase_id}

                                    />
                                </td>
                                <td></td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </div>



    )



};

export default RunSectionCase;