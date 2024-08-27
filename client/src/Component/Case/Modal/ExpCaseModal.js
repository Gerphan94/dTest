import React, { useState, useCallback } from "react";

function ExpCaseModal({ caseId }) {

    const urlAPI = process.env.REACT_APP_API_URL;


    const [exp, setExp] = useState('');




    // const urlWEB = process.env.REACT_APP_WEB_URL;


    const handleSubmit = useCallback(
        async (e) => {
        }
    )

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                                <div className="text-lg font-semibold select-none">
                                    Edit Expectation
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div >

                                    <div className="py-1">
                                        <label htmlFor="section_des" className="block font-bold py-1">
                                            Expectation
                                        </label>
                                        <textarea
                                            type="text"
                                            name="expectation"
                                            rows={5}
                                            // value={formData['description']}
                                            className="border w-full outline-none px-2 py-1"

                                        />
                                        <p className="text-gray-400">The expected result after executing the test case.</p>

                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 bg-[#f5f5f5]">
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                {exp === '' ?

                                    <input
                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                        type="submit"
                                        value="Save"
                                    >
                                    </input>
                                    :
                                    <input
                                        className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                        type="disabled"
                                        value="Save"
                                        disabled={true}
                                    >
                                    </input>
                                }
                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>
        </div>

    )


}

export default ExpCaseModal;