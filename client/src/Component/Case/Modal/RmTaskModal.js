import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, BtnOKDisabled, BtnOK } from "../../Common/CustomButton";

import { useCase } from "../../../Store/CaseContext";

import DropDown from "../../Common/Dropdown";

import { IoIosAddCircle, IoIosCloseCircleOutline } from "react-icons/io";



function RmTaskModal({ fetchCaseData, setRmTaskModal, rmTaskModal, sectionId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlRM = process.env.REACT_APP_RM_URL;
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
        { id: 'Đang thực hiện', name: 'Đang thực hiện' },
        { id: 'Đã thực hiện', name: 'Đã thực hiện' },
        { id: 'Chờ phản hồi', name: 'Chờ phản hồi' },
        { id: 'Đóng', name: 'Đóng' },
        { id: 'Từ chối', name: 'Từ chối' },
        { id: 'Mở lại', name: 'Mở lại' }
    ]

    const [selectedStatus, setSelectedStatus] = useState({ id: 'Mới', name: 'Mới' });

    const fetchRmtasks = async () => {
        const response = await fetch(`${urlAPI}/api/get-rmtasks-by-case-id/${CaseId}`);
        const data = await response.json();
        console.log(data)
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
        const form = e.target;
        const formData = new FormData(form);
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
                form.reset();
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }

    }

    const handleChangeStatus = async (e, id) => {
        const selectedValue = e.target.value;
        try {
            const response = await fetch(`${urlAPI}api/update-rmtask-status/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'status': selectedValue }),
            });
            if (response.ok) {
                console.log('Status updated successfully');
                fetchRmtasks();
                fetchCaseData(sectionId);
            }
            else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
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
                                            <th className="w-40 text-center">Trạng thái</th>
                                            <th className="w-6">...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rmtasks.map((item) => (
                                            <tr>
                                                <td className="text-center">1</td>
                                                <td className="text-center px-2 py-1">
                                                    <a className={`text-[#5993bc] hover:underline hover:text-[#1E201E] `} href={`${urlRM}${item.task_id}`} target="_blank" rel="noreferrer">
                                                        {item.task_id}
                                                    </a>
                                                </td>
                                                <td className="text-left px-2 py-1">
                                                    <a className={`text-[#5993bc] hover:underline hover:text-[#1E201E] `} href={`${urlRM}${item.task_id}`} target="_blank" rel="noreferrer">
                                                        {item.title}
                                                    </a>
                                                </td>

                                                <td className="text-center py-1">
                                                    <select
                                                        className="w-36 border outline-none px-2 py-0.5 rounded-xl"
                                                        onChange={(e) => handleChangeStatus(e, item.id)}
                                                        value={item.status}
                                                    >
                                                        {status.map((item) => (
                                                            <option value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>

                                                </td>
                                                <td className="text-center">
                                                    <button className="text-red-500 flex items-center justify-center">
                                                        <IoIosCloseCircleOutline className="text-lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <form className="flex gap-2" spellCheck="false" onSubmit={(e) => onSubmit(e)}>
                                    <input
                                        id="task_id"
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
                                        id="title"
                                        name="title"
                                        className="w-full border outline-none px-2 py-0.5"
                                        type="text"
                                        placeholder="Title"
                                        required={true}
                                    />
                                    <div className="w-40">
                                        <select
                                            id="status"
                                            name="status"
                                            className="w-36 border outline-none px-2 py-0.5"
                                            value={selectedStatus}
                                        >
                                            {status.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))}
                                        </select>


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