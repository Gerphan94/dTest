import React, { useState, useCallback } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";

function TagModal({ setShowModal }) {

    const urlAPI = process.env.REACT_APP_API_URL;

    



    // const urlWEB = process.env.REACT_APP_WEB_URL;

    const handleCancel = () => {
        setShowModal(false)
    }


    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-2/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                            <div className="text-lg font-semibold select-none">
                                Tag Manager
                            </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 text-left text-sm">
                            <div >

                                <div className="py-1 flex gap-2 items-center">
                                    <label htmlFor="section_des" className="block w-20 font-bold py-1">
                                        Tag name
                                    </label>
                                    <input
                                        type="text"
                                        name="tag_name"
                                        className="border border-gray-400 p-1 w-full outline-none"
                                    />
                                    <button>Thêm</button>
                                </div>
                                <div className="min-h-96">

                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5] text-sm">
                            <BtnCancel onClick={handleCancel} />
                        </div>
                    </div>




                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>


        </div>

    )


}

export default TagModal;