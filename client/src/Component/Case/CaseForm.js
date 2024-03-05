import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css"
import Select from 'react-select'
import { useParams, Link } from 'react-router-dom';



function CaseForm() {

    const urlAPI = "http://127.0.0.1:5000/api/";
    const { module_id } = useParams();
    const action = "Add";

    const [sectionOption, setSectionOption] = useState([]);
    
    const priorityOptions = [
        { label:"Low", value: 1},
        { label:"Medium", value: 2},
        { label:"High", value: 3},
        { label:"Critical", value: 4}

    ]
 
    useEffect(() => {
        const fecthSectionList = async () => {
            try {
                const response = await fetch(urlAPI + "get_sections_of_module/" + module_id);
                const data = await response.json();
                const sections = []
                data.forEach(element => {
                    sections.push({ value: element.id, label: Array(element.level*3).fill('\u00a0').join('') + element.name })
                });
                setSectionOption(sections)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fecthSectionList();
    }, [module_id])

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            try {
                const response = await fetch(urlAPI + 'add_case/' + formJson['section'] , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();

                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }, []);



    return (
        <div className="flex">
            <div className={styles.MainPage}>
                <div className="text-left border-b-2 p-2">
                    {action === 'Add' ? "Add Testcase" : " Edit Testcase "}
                </div>
                <div className="p-5">
                    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" spellCheck={false}>
                        <div className="text-left mb-4">
                            <label htmlFor="case_title" className="block">
                                Title*
                            </label>
                            <input
                                name="case_title"
                                type="text"
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2 py-1"
                                required={true} />
                        </div>

                        <div className="border border-[#d2e2ed] grid grid-cols-4 gap-4 p-4">
                            <div className="text-left">
                                <label htmlFor="section" className="block">
                                    Section*
                                </label>
                                <Select
                                name="section"
                                options={sectionOption}
                                />
                            </div>
                            <div className="text-left">
                                <label htmlFor="section" className="block">
                                    Priority *
                                </label>
                                <Select 
                                name="priority"
                                defaultValue={{label:"Medium", value: 2}}
                                options={priorityOptions} />
                            </div>
                        </div>
                        {/* Description */}
                        <div className="text-left mt-5">
                            <label htmlFor="description" className="block">Description</label>
                            <textarea
                                name="description"
                                type="text"
                                rows={4}
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                                />
                            <p className="text-gray-400">The preconditions of this test case. Reference other test cases with [C#] (e.g. [C17]).
                            </p>
                        </div>

                        {/* Precondition */}
                        <div className="text-left mt-5">
                            <label htmlFor="precondition" className="block">Precondition</label>
                            <textarea
                                name="precondition"
                                type="text"
                                rows={4}
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                                 />
                            <p className="text-gray-400">The preconditions of this test case. Reference other test cases with [C#] (e.g. [C17]).
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="text-left mt-5">
                            <label htmlFor="steps" className="block">Steps</label>
                            <textarea
                                name="steps"
                                type="text"
                                rows={4}
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                               />
                            <p className="text-gray-400">The required steps to execute the test case.</p>
                        </div>

                        {/* Expectation */}
                        <div className="text-left mt-5">
                            <label htmlFor="expectation" className="block">Expectation</label>
                            <textarea
                                name="expectation"
                                type="text"
                                rows={4}
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                               />
                            <p className="text-gray-400">The expected result after executing the test case.</p>
                        </div>

                        <div className="flex gap-4 mt-4 mb-20">
                            <button className="bg-[#049474] w-28 text-white">Add Case</button>
                            <button className="border border-red-500 w-28 text-red-500">Cancel</button>
                        </div>


                    </form>
                </div>
            </div>
            <div className="bg-[#d2e2ed] w-48 h-screen text-white"></div>



        </div>
    )


}

export default CaseForm;