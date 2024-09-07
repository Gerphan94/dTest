import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useCase } from "../../../Store/CaseContext";

import DropDown from "../../Common/Dropdown";

import { IoIosAddCircle } from "react-icons/io";



function RmTaskModal( {  fetchCaseData, setRmTaskModal, rmTaskModal, sectionId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const { showRmModal, selectedCaseId } = useCase();
    const [caseTitle, setCaseTitle] = useState("");
    const CaseId = rmTaskModal.caseId

    const [rmtasks, setRmtasks] = useState([]);


    const closeModal = () => {
        setRmTaskModal({
            'showModal': false,
            'caseId': null
        })
    }

    const status = [
        { id: 'Mới', name: 'Mới' },
        { id: 'Đã thực hiện', name: 'Đã thực hiện' },
        { id: 'Đóng', name: 'Đóng' },]

    const [selectedStatus, setSelectedStatus] = useState({ id: 'Mới', name: 'Mới' });
    
    const fetchRmtasks = async () => {
        const response = await fetch(`${urlAPI}/api/get-rmtasks-by-case-id/${CaseId}`);
        const data = await response.json();
        setRmtasks(data);
    }
    const fetchCaseDataDetail = async () => {
        const response = await fetch(`${urlAPI}/api/get-case-by-id/${CaseId}`);
        const data = await response.json();
        setCaseTitle(data.title);
    }


    useEffect(() => {
        if (CaseId) {
            fetchRmtasks();
            fetchCaseDataDetail();
        }
    }, [CaseId])

 

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        formJson['status'] = selectedStatus.id
        try {
            const response = await fetch(`${urlAPI}/api/insert-rmtask/${CaseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            if (response.ok) {
                fetchRmtasks();
                fetchCaseData(sectionId);
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }

    }






return (
    
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative lg:w-3/5 md:w-2/3 w-full my-6 mx-auto  p-4">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 bg-[#eaf1f7]">
                        <div className="text-lg font-semibold select-none">
                            <span className=" bg-purple-600 px-2 py-0.5  rounded-xl text-white select-none mr-2">C{selectedCaseId}</span>
                            {caseTitle}
                        </div>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 text-left text-sm h-96">

                        <div className="flex flex-col justify-between h-full">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="w-10 text-center">#</th>
                                        <th className="w-20 text-center">Task ID</th>
                                        <th className="text-left px-2">Title</th>
                                        <th className="w-40">Trạng thái</th>
                                        <th>...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rmtasks.map((item) => (
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="text-center px-2 py-1">{item.task_id}</td>
                                            <td className="text-left px-2 py-1">{item.title}</td>
                                            <td>{item.status}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <form className="flex gap-2" spellCheck="false" onSubmit={(e) => onSubmit(e)}>
                                <input
                                    name="task_id"
                                    className="w-20 border outline-none px-2 py-0.5"
                                    type="number"
                                    placeholder="Task ID"
                                    required={true}
                                    onKeyDown={(event) => {
                                        if (["e", "E", ".", "-"].includes(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                   
                                />
                                <input
                                    name="title"
                                    className="w-full border outline-none px-2 py-0.5"
                                    type="text"
                                    placeholder="Title"
                                    required={true}
                                />
                                <div className="w-40">
                                    <DropDown data={status} selectedOption={selectedStatus} setSelectedOption={setSelectedStatus} />

                                </div>
                                <div className="h-full">
                                    <button className="flex items-center size-full" type="submit">
                                        <IoIosAddCircle className="text-blue-500 size-full" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex gap-2 items-center justify-start p-2 bg-[#f5f5f5]">

                        <BtnCancel onClick={() => closeModal()} name="Close" />
                    </div>
                </div>


            </div>
        </div >
        <div className="opacity-25 fixed inset-0 z-40 bg-black overflow-hidden"></div>


    </>

)


}

export default RmTaskModal;