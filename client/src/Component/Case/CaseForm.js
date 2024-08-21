import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles.module.css"
import Select from 'react-select'
import { useParams, Link } from 'react-router-dom';
import Dropdown from "../Common/Dropdown";

function CaseForm({ caseType, formData }) {

    const urlAPI = process.env.REACT_APP_API_URL;

    const [sectionOption, setSectionOption] = useState([]);

    const priorities = [
        { id: 1, name: "Low" },
        { id: 2, name: "Medium" },
        { id: 3, name: "High" },
        { id: 4, name: "Critical" }
    ]

    const [selectedPriority, setSelectedPriority] = useState({ id:2, name: "Medium" });

    // useEffect(() => {
    //     const fecthSectionList = async () => {
    //         try {
    //             const response = await fetch(urlAPI + "get_sections_of_module/" + module_id);
    //             const data = await response.json();
    //             const sections = []
    //             data.forEach(element => {
    //                 sections.push({ value: element.id, label: Array(element.level * 3).fill('\u00a0').join('') + element.name })
    //             });
    //             setSectionOption(sections)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fecthSectionList();
    // }, [module_id])

    
    return (
        <div className="p-4 text-sm">
            <form  autoComplete="off" spellCheck={false}>
                <div className="text-left mb-4">
                    <label htmlFor="case_title" className="block">
                        Title<span className="text-red-500">*</span>
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
                        <Dropdown 
                        data={priorities}
                        selectedOption={selectedPriority}
                        setSelectedOption={setSelectedPriority}
                        
                         />
                        />
                    </div>
                    <div className="text-left">
                        <label htmlFor="priority" className="block">
                            Priority*
                        </label>
                        <Dropdown 
                        data={priorities}
                        selectedOption={selectedPriority}
                        setSelectedOption={setSelectedPriority}
                        
                         />

                    </div>
                    <div className="text-left">
                        <label htmlFor="estimate" className="block">
                            Estimate
                        </label>
                        <input
                            name="estimate"
                            type="text"
                            className="border border-[#d2e2ed] rounded-sm outline-none px-2 py-0.5 text-right"
                        />
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
    )
}

export default CaseForm;