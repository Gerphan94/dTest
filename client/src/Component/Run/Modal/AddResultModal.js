import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import StatusDropdown from "../StatusDropdown";


function AddResultModal({ setShowModal, project_id, user_id }) {

    const urlAPI = process.env.REACT_APP_API_URL;

    const [selectedOption, setSelectedOption] = useState({'id': 1, 'name': 'Untested'});


    const closeModal = () => {
        setShowModal({
            "show": false,
        })
    }

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-1/2 w-full my-6 mx-auto h-3/4 p-4">
                    <form method="post" autoComplete='none' spellCheck="false">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                                <div className="text-lg font-semibold select-none">
                                    Add Result
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm h-[450px] min-h-96 ">
                                <div className="py-1 flex gap-2">
                                    <label htmlFor="section_des" className="block font-bold py-1">
                                        Status
                                    </label>
                                    <StatusDropdown selectedOption={selectedOption} />
                                </div>
                                <div className="py-1">
                                    <label htmlFor="section_des" className="block font-bold py-1">
                                        Comment
                                    </label>
                                    <textarea
                                        type="text"
                                        name="title"
                                        rows={5}

                                        className="border w-full outline-none px-2 py-1"
                                    />
                                    <p className="text-gray-400">Describe your test result.</p>
                                </div>


                            </div>
                            {/*footer*/}
                            <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                                <BtnOK />
                                <BtnCancel onClick={() => closeModal()} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>
        </div>
    )
}

export default AddResultModal;