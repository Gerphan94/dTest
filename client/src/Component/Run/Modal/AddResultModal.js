import React, { useState, useCallback, useEffect } from "react";
import { BtnCancel, SubmitButtonOK } from "../../Common/CustomButton";


function AddResultModal({ setShowModal, runCaseId, status }) {

    const urlAPI = process.env.REACT_APP_API_URL;

    const [selectedOption, setSelectedOption] = useState({ 'id': 1, 'name': 'Untested' });
    // 'show': true,
    //             'runcaseId': runCaseId,
    //             'statusId': id
    const [users, setUsers] = useState([]);
    const colors = ['#737373', '#338A41', '#A9093A', '#474747', '#B99109']

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(urlAPI + "api/users");
                const data = await response.json();
                console.log(data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchUsers();
        setSelectedOption(status)
    }, [])


    const handleChangeStatus = (event) => {
        setSelectedOption({ 'id': event.target.value, 'name': event.target.name });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = fetch(urlAPI + 'run-api/update-runcase-status/' + runCaseId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'statusId': selectedOption.id }),
            });
            if (response.status === 200) {
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-1/2 w-full my-6 mx-auto h-3/4 p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none' spellCheck="false">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className={`flex items-start justify-between p-2 bg-[${colors[selectedOption.id - 1]}]`}>
                                <div className="text-lg font-semibold select-none text-white">
                                    Add Result
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm h-[350px] flex">
                                <div className="w-3/5">
                                    <div className="py-1 ">
                                        <label htmlFor="section_des" className="block font-bold py-1">
                                            Status
                                        </label>
                                        <select
                                            className="border  w-full px-2 py-1 outline-none rounded-lg"
                                            onChange={(e) => handleChangeStatus(e)}
                                            value={selectedOption.id}
                                        >
                                            <option value={2}>Passed</option>
                                            <option value={3}>Failed</option>
                                            <option value={4}>Blocked</option>
                                            <option value={5}>Retest</option>

                                        </select>
                                        <p className="text-gray-400">Set the test status (passed, failed etc.).                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor="section_des" className="block font-bold py-1">
                                            Comment
                                        </label>
                                        <textarea
                                            type="text"
                                            name="comment"
                                            className="border w-full outline-none px-2 py-1"
                                        />
                                        <p className="text-gray-400">Describe your test result.</p>
                                    </div>
                                </div>
                                <div className="w-2/5 px-4">
                                    <div className="py-1">
                                        <label htmlFor="section_des" className="block font-bold py-1">
                                            Assign To
                                        </label>
                                        <select className="border  w-full px-2 py-1 outline-none rounded-lg">
                                            <option value={-1}></option>
                                            <option value={0}>Nobody (Unassigned)</option>
                                            <option value={0}>Me</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}

                                        </select>
                                        <p className="text-gray-400">Assign to another team member.</p>
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor="section_des" className="block font-bold py-1">
                                            Version
                                        </label>
                                        <input
                                            type="text"
                                            name="version"
                                            className="border w-full outline-none px-2 py-1"
                                        />
                                        <p className="text-gray-400">The version you tested against.</p>
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex gap-6 items-center justify-start p-2 bg-[#f5f5f5] text-sm">
                                <SubmitButtonOK name='Add Result' />
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