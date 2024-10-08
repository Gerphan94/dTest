import React, { useState, useRef, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useGlobalVariables } from "../../../Store/AppContext";
import { useCase } from "../CaseContext";
 
function CaseExpectationModal({ caseExpectationModal, setModal, fetchCaseData, sectionId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const caseId = caseExpectationModal.caseId

    const inputRef = useRef(null);


    const [expForm, setExpForm] = useState(caseExpectationModal.expectation);
    const [availableSave, setAvailableSave] = useState(false);
    const { logginUser } = useGlobalVariables();

    useEffect(() => {
        if (caseExpectationModal) {
          inputRef.current?.focus();
        }
      }, [caseExpectationModal]);
      
    const closeModal = () => {
        setModal({
            ...caseExpectationModal,
            showModal: false
        })
    }
       

    const handeChange = (e) => {
        setExpForm(e.target.value)
        if (e.target.value === caseExpectationModal.expectation) {
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
                const response = await fetch(urlAPI + 'api/update-case-expect/' + caseId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
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
                                            id="expectation"
                                            type="text"
                                            name="expectation"
                                            rows={5}
                                            value={expForm}
                                            ref={inputRef}
                                            className="border w-full outline-none px-2 py-1"
                                            onChange={(e) => handeChange(e)}

                                        />
                                        <p className="text-gray-400">The expected result after executing the test case.</p>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">
                                {availableSave ? <BtnOK /> : <BtnOKDisabled /> }
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

export default CaseExpectationModal;