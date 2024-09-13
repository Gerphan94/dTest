import React, { useState, useCallback } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";

function CaseTitleModal({ caseTitleModal, setCaseTitleModal, fetchCaseData, sectionId }) {

    console.log('caseTitleModal', caseTitleModal)

    const urlAPI = process.env.REACT_APP_API_URL;
    const [titleForm, setTitleForm] = useState(caseTitleModal.title);
    const [availableSave, setAvailableSave] = useState(false);
    const { logginUser } = useGlobalVariables();


    const closeModal = () => {
        setCaseTitleModal({
            ...caseTitleModal,
            showModal: false
        })
    }

  
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};

const handeChange = (e) => {

    setTitleForm(e.target.value)
    if (e.target.value === caseTitleModal.title) {
        setAvailableSave(false)
    }
    else {
        setAvailableSave(true)
    }

}

const handleSubmit = (
    async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson['user_id'] = logginUser.id
        try {
            const response = await fetch(urlAPI + 'api/update-case-title/' + caseTitleModal.caseId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            if (response.ok) {
                const data = await response.json();
                fetchCaseData(sectionId);
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
            <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none' spellCheck="false">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                            <div className="text-lg font-semibold select-none">
                                Edit Case Title
                            </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 text-left text-sm">
                            <div >

                                <div className="py-1">
                                    <label htmlFor="section_des" className="block font-bold py-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        type="text"
                                        id="title"
                                        name="title"
                                        rows={5}
                                        value={titleForm}
                                        className="border w-full outline-none px-2 py-1"
                                        onChange={(e) => handeChange(e)}
                                        onKeyDown={handleKeyPress}

                                    />
                                    <p className="text-gray-400">Edit the title of the test case.</p>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                            {availableSave ? <BtnOK /> : <BtnOKDisabled />}
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

export default CaseTitleModal;