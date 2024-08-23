import React, { useState, useEffect, useCallback } from "react";
// import styles from "../styles.module.css"
import Select from 'react-select'
import { useParams, Link } from 'react-router-dom';
import Dropdown from "../../Common/Dropdown";
import SectionDropdown from "./SectionDropdown";
function CaseForm({ projectId, formType, caseData = {}, caseId = null, sectionId = null }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [sections, setSections] = useState([]);

    const [selectedType, setSelectedType] = useState({ id: 1, name: 'Other' });

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-section-list/" + projectId);
                const data = await response.json();
                setSections(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();
    }, [projectId]);



    const priorities = [
        { id: 1, name: "Low" },
        { id: 2, name: "Medium" },
        { id: 3, name: "High" },
        { id: 4, name: "Critical" }
    ]

    const [title, setTitle] = useState('');
    const [selectedPriority, setSelectedPriority] = useState({ id: null, name: null });
    const [selectedSection, setSelectedSection] = useState({ id: null, name: null });
    const [expectation, setExpectation] = useState('');

    useEffect(() => {
        if (formType === 'edit') {

            const fetchCase = async () => {
                try {
                    const response = await fetch(urlAPI + "api/get-case-by-id/" + caseId);
                    const data = await response.json();
                    console.log('data is', data)
                    setTitle(data.title)
                    setSelectedPriority(data.priority)
                    setSelectedSection(data.section)
                    setExpectation(data.expectation)
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchCase();
        }
    }, [caseId]);



return (
    <div className="p-4 text-sm">
        <form autoComplete="off" spellCheck={false}>
            <div className="text-left mb-4">
                <label htmlFor="case_title" className="block">
                    Title<span className="text-red-500">*</span>
                </label>
                <input
                    name="case_title"
                    type="text"
                    value={title}
                    className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2 py-1"
                    required={true}
                />
            </div>

            <div className="border border-[#d2e2ed] grid grid-cols-4 gap-4 p-4 bg-[#F6FBFF]">
                <div className="text-left">
                    <label htmlFor="section" className="block">
                        Section*
                    </label>
                    <SectionDropdown
                        required={true}
                        data={sections}
                        selectedOption={selectedSection}
                        setSelectedOption={setSelectedSection}
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

                <div className="text-left">
                    <label htmlFor="priority" className="block">
                        Type*
                    </label>
                    <Dropdown
                        data={[{ id: '1', name: 'Other' }]}
                        selectedOption={selectedType}
                        setSelectedOption={setSelectedType}
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
                    className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
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
                    className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
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
                    className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
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
                    value={expectation}
                    className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
                />
                <p className="text-gray-400">The expected result after executing the test case.</p>
            </div>

            <div className="flex gap-4 mt-4 mb-20">
                {formType === 'add' ?
                    <>
                        <button className="bg-[#049474] w-28 text-white">Add Test Case</button>
                        <button className="bg-[#049474] w-28 text-white">Add & Next</button>
                    </>
                    :
                    <>
                        <button className="bg-[#049474] w-28 text-white">Save Test Case</button>
                    </>



                }
                <button className="border border-red-500 w-28 text-red-500">Cancel</button>
            </div>
        </form>
    </div>
)
}

export default CaseForm;