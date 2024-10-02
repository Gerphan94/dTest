import React, { useState, useCallback, useRef, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../Common/CustomButton";

//import { useGlobalVariables } from "../../../Store/AppContext";

function AddProjectModal( { setShowModal } ) {

    const inputRef = useRef(null);
    const urlAPI = process.env.REACT_APP_API_URL;

    const [availableSave, setAvailableSave] = useState(false);
    const [projectName, setProjectName] = useState('');

    

   

    const closeModal = () => {
        setShowModal(false);
    }


const handleSubmit = (
    async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(urlAPI + 'api/insert-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_name: projectName
                }),
            });
            if (response.ok) {
                closeModal();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }

        
    }
)

return (
    <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-1/3 md:w-2/3 w-full  my-6 mt-[-400px] mx-auto max-w-3xl p-4">
                <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='off' spellCheck="false">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                            <div className="text-lg font-semibold select-none">
                                Add Project
                            </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 text-left text-sm">
                            <div >
                                <div className="py-1">
                                    <label htmlFor="section_des" className="block font-bold py-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border w-full outline-none px-2 py-1"
                                        required
                                        ref={inputRef}
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        />
                                   
                                    <p className="text-gray-400">Ex: New Widget, Intranet or Payroll Software.</p>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                            {projectName  ? <BtnOK /> : <BtnOKDisabled />}
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

export default AddProjectModal;