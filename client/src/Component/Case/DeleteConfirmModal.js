import React, { useCallback } from "react";


function DeleteConfilmModal() {

    const urlAPI = "http://127.0.0.1:5000/api/";

    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <div >
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 bg-[#eaf1f7]">
                                <div className="text-xl font-semibold select-none">Confirmation</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div>
                                    Are you want delete?
                                    
                                    
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
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                >
                                    Delete
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

export default DeleteConfilmModal;