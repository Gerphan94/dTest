import React, { useCallback, useState } from "react";


function SectionModalEdit({section_id, section_name, section_des,  setEditSectionModalShow, setSectionName  }) {

    const urlAPI = "http://127.0.0.1:5000/api/";


    const [inputName, setInputName] = useState(section_name);
    const [inputDes, setInputDes] = useState(section_des);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'section_name') {
            setInputName(value);
        }
        else {
            setInputDes(value);
        }
    }

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            try {
                const response = await fetch(urlAPI + 'update_section/' + section_id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    setSectionName(data.name);
                    setEditSectionModalShow(false);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }, []);


    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 bg-[#eaf1f7]">
                                <div className="text-xl font-semibold select-none">Edit Section</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div>
                                    <div className="py-2">
                                        <label htmlFor="section_name" className="block font-bold">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="section_name"
                                            className="border w-full outline-none px-2 py-1"
                                            value={inputName}
                                            required={true}
                                            onChange={ handleChange }
                                        />

                                    </div>
                                    <div className="py-2">
                                        <label htmlFor="section_des" className="block font-bold">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            name="section_des"
                                            rows={5}
                                            className="border w-full outline-none"
                                            value={inputDes}
                                            onChange={ handleChange }
                                            
                                        />
                                    </div>

                                </div>

                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 bg-[#f5f5f5]">
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                    onClick={() => setEditSectionModalShow(false)}
                                >
                                    Cancel
                                </button>
                                <input
                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                    type="submit"
                                    value="Submit"
                                >
                                </input>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>

    )


}

export default SectionModalEdit;