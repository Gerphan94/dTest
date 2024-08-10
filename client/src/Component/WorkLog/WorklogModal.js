import React, { useCallback, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WorklogModal({ setShowModal, setNoticeMsg, setShowNotice }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;


    const formatWorklogDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const [formData, setFormData] = useState({
        worklog_date: new Date(),
        title: "Regression Test " + formatWorklogDate(new Date()),
    })

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
                const data = await response.json();
                if (response.ok) {
                    setShowModal(false);
                } else {
                    console.log(data);
                    setNoticeMsg(data.error)
                    setShowNotice(true);
                }
            } catch (error) {
                console.log("--------------------")
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
                                <div className="text-xl font-semibold select-none">WorkLog</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div className="flex gap-6">
                                    <div className="py-2">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            Ngày
                                        </label>
                                        <DatePicker
                                            className="border px-2 py-1 text-left outline-none w-28"
                                            id="date"
                                            name="date"
                                            dateFormat="dd/MM/yyyy"
                                            selected={formData.worklog_date}
                                            onChange={(date) => setFormData({ ...formData, worklog_date: date })}
                                        />

                                    </div>

                                    <div className="py-2 w-full">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            Tiêu đề
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="title"
                                                autoComplete="off"
                                                spellCheck="false"
                                                className="border w-full outline-none px-2 py-1"
                                                required={true}
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

export default WorklogModal;