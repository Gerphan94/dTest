import React, { useCallback, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../Common/Dropdown";


function WorkTaskModal({ setShowModal }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const [hidePwd, setHidePwd] = useState(true);
    const [worklog_date, setWorklogDate] = useState(new Date());

    const typeData = [
        { id: 1, name: "Bug mới" },
        { id: 2, name: "Xác nhận bugs" },
        { id: 3, name: "Bug cũ" }
    ];

    const [selectedTypeData, setSelectedTypeData] = useState({ id: 1, name: "Bug mới" });
    const status = [
        { id: 1, name: "Mới" },
        { id: 2, name: "Pass" },
        { id: 3, name: "Fail" },
        { id: 4, name: "Block" }
    ];
    const [selectedStatus, setSelectedStatus] = useState({ id: 1, name: "Mới" });

    


    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formJson = Object.fromEntries(formData.entries());

            console.log(formJson);

            try {
                const response = await fetch(urlAPI + "api/insert-worklog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setShowModal(false);
                } else {
                    console.error("Error:", response.status);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }, []);

    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[90] outline-none focus:outline-none">
                <div className="relative lg:w-2/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4 top-[-200px]">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none text-[#536493]">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 bg-[#eaf1f7]">
                                <div className="text-xl font-semibold select-none">WorTask</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div className="w-40">
                                    <Dropdown
                                        data={typeData}
                                        selectedOption={selectedTypeData}
                                        setSelectedOption={setSelectedTypeData}
                                    />
                                </div>
                                <div className="flex gap-6">
                                    <div className=" py-2 w-24">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            TaskID
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="taskid"
                                                autoComplete="off"
                                                spellCheck="false"
                                                className="border w-full outline-none px-2 py-1"
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="py-2 w-full">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            Tiêu đề
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                name="title"
                                                autoComplete="off"
                                                spellCheck="false"
                                                className="border w-full outline-none px-2 py-1"
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="py-2 w-32">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            Trạng thái
                                        </label>
                                        <div className="">
                                            <Dropdown
                                                data={status}
                                                selectedOption={selectedStatus}
                                                setSelectedOption={setSelectedStatus}
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*footer*/}
                            <div className="flex justify-end p-2 bg-[#f5f5f5]">
                                <button
                                    className="bg-blue-500  text-white border border-blue-500 active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                    type="submit"
                                >

                                    Thêm
                                </button>
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Đóng
                                </button>

                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <div className="opacity-35 fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900"></div>
        </div>

    )


}

export default WorkTaskModal;