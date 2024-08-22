import React, { useState, useCallback } from "react";


function SectionModal({ sectionModal, setSectionModal, setData }) {

    const urlAPI = process.env.REACT_APP_API_URL;

    const [formData, setFormData] = useState(sectionModal['formData'])


    // const urlWEB = process.env.REACT_APP_WEB_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }


    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitData = new FormData(form);
            const formJson = Object.fromEntries(submitData.entries());
            formJson['parent_id'] = formData['parent_id'];
            formJson['level'] = formData['level'];
            formJson['project_id'] = formData['project_id'];

            console.log(formJson);
            try {
                const response = await fetch(urlAPI + 'api/insert-section', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    const new_data = {
                        "section_id": data.id,
                        "section_name": data.name,
                        "cases": [],
                        "sub": []
                    }
                    setSectionModal(prevState => ({ ...prevState, show: false }));
                    if (sectionModal['type'] === 'insert') {
                        if (formData['parent_id'] === 0) {
                            setData(prevData => [...prevData, new_data]);
                        } else {
                            setData(prevData => [...prevData.filter(x => x.section_id !== formData['parent_id']), new_data]);
                        }
                    }

                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }, []);

    return (
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-1/3 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 bg-[#eaf1f7]">
                                <div className="text-xl font-semibold select-none">
                                    {sectionModal['type'] === 'insert' ? 'Add Section' : 'Edit Section'}
                                </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div>
                                        <div className="w-full py-2">
                                            <label htmlFor="section_name" className="block font-bold">
                                                Name*
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="border w-full outline-none px-2 py-1"
                                                required={true}
                                                value={formData['name']}
                                                autoComplete='off'
                                                onChange={(e) => handleChange(e)}
                                            />

                                        </div>
                                       


                                    <div className="py-2">
                                        <label htmlFor="section_des" className="block font-bold">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            name="description"
                                            rows={5}
                                            value={formData['description']}
                                            className="border w-full outline-none px-2 py-1"
                                            onChange={(e) => handleChange(e)}

                                        />
                                    </div>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-2 bg-[#f5f5f5]">
                                <button
                                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                    type="button"
                                    onClick={() => setSectionModal(prevState => ({ ...prevState, show: false }))}
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

export default SectionModal;