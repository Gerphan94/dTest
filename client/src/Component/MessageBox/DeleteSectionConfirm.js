import React, { useState, useEffect } from "react";


function DeleteSectionConfirm({ section_id }) {

    const urlAPI = "http://127.0.0.1:5000/api/";

    const [sectionCount, setSectionCount] = useState(0);
    const [caseCount, setCaseCount] = useState(0);


    useEffect(() => {
        const fetchTotalChildSection = async () => {
            try {
                const response = await fetch(urlAPI + "get_child_section_count/" + section_id);
                const data = await response.json();
                setSectionCount(data.total);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTotalChildSection();

    }, [section_id])


    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <div >
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between px-3 py-1 bg-[#e40046]">
                                <div className="text-xl font-semibold select-none text-white">Confirmation</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                {sectionCount === 0 && caseCount === 0 ?
                                    <div>
                                        Are you want to delete this section?
                                    </div> :
                                    <div> Have {sectionCount} section
                                    </div>
                                }
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 bg-[#f5f5f5]">

                                <button
                                    className="text-white bg-[#049474] font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150  opacity-80 hover:opacity-100"
                                    type="button"
                                >
                                    Delete
                                </button>
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>

    )


}

export default DeleteSectionConfirm;