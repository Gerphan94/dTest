import React, { useState, useCallback } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import SectionModalAdd from "./SectionModalAdd";
import SectionModalEdit from "./SectionModalEdit";
import DeleteConfilmModal from "./DeleteConfirmModal";


function SectionCase({ data, curModule, setCaseData }) {

    const urlAPI = "http://127.0.0.1:5000/api/";
    const section_id = data.section_id;
    const module_id = curModule;
    const [isShowCaseForm, setisShowCaseForm] = useState(false);
    const [NewSectionModalShow, setNewSectionModalShow] = useState(false);
    const [EditSectionModalShow, setEditSectionModalShow] = useState(false);
    const [isDeleteSection, setDeleteSection] = useState(false);


    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            try {
                const response = await fetch(urlAPI + 'add_case/' + section_id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    setisShowCaseForm(false);

                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
        [section_id] // Dependency array is empty because there are no dependencies
    );

    return (
        <div className="mb-6">
            <div className="flex mb-2">
                <div className="text-left font-bold text-lg">{data.section_name}</div>
                <button className="ml-4 text-blue-600" onClick={() => setEditSectionModalShow(true)}>
                    <CiEdit />
                </button>
                <button className="ml-1 text-red-500" onClick={() => setDeleteSection(true)}>
                    <FaXmark />
                </button>
            </div>
            <div className="w-full">
                <table className="w-full">
                    <thead className="">
                        <tr className="bg-gray-300 border border-gray-300">
                            <th className="w-20 text-center">#</th>
                            <th className="text-left">Title</th>
                            <th className="text-left">Priority</th>
                            <th className="text-left">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.cases && data.cases.map((ele, index) =>
                            <tr className="border border-gray-200" key={ele.case_id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="px-2 text-left">
                                        {ele.case_title}
                                    </div>
                                </td>
                                <td></td>
                                <td>
                                    <button>
                                        <CiEdit />
                                    </button>
                                    <button type="button">
                                        <FaXmark
                                            className="bg-red-500 border border-red-500 rounded-full text-white cursor-pointer opacity-80 hover:opacity-100"
                                            onClick={() => setisShowCaseForm(false)}
                                        />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                                    className="bg-green-600 p-1 text-white w-8 h-8 rounded-sm cursor-pointer opacity-80 hover:opacity-100"
                                />
                            </button>
                            <button type="button">
                                <FaXmark
                                    className="bg-white border border-red-500 p-1 text-red-500 w-8 h-8 rounded-sm cursor-pointer opacity-80 hover:opacity-100"
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
                <SectionModalAdd parentSectionId={section_id} level={data.section_level + 1} curModule={module_id} setNewSectionModalShow={setNewSectionModalShow} setCaseData={data.setCaseData} />
            }
            {EditSectionModalShow &&
                <SectionModalEdit
                    section_id={data.section_id}
                    section_name={data.section_name}
                    section_des={data.section_des}
                    setEditSectionModalShow={setEditSectionModalShow}
                />
            }

            {isDeleteSection && 
                <DeleteConfilmModal />
            }

        </div>



    )



}
export default SectionCase;