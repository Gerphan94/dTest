import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SectionDropdown from "./SectionDropdown";
import Dropdown from "../../Common/Dropdown";
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalVariables } from "../../../Store/AppContext";
import Navbar from "../../navBar";

function CaseEdit(props) {

    const urlAPI = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const { projectId, logginUser } = useGlobalVariables();
    const { caseId } = useParams()

    const [sections, setSections] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimate, setEstimate] = useState('');
    const [precondition, setPrecondition] = useState('');
    const [step, setStep] = useState('');
    const [expectation, setExpectation] = useState('');

    const [selectedPriority, setSelectedPriority] = useState({ id: null, name: 'null' });
    const [selectedSection, setSelectedSection] = useState({ id: null, name: '' });
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

        const fetchCase = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-case-by-id/" + caseId);
                const data = await response.json();
                setSelectedPriority(data.priority)
                setSelectedSection(data.section)
                setTitle(data.title)
                setDescription(data.description)
                setEstimate(data.estimate)
                setPrecondition(data.precondition)
                setStep(data.step)
                setExpectation(data.expectation)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();
        fetchCase();
    }, [projectId, urlAPI, caseId]);

    const handleSectionChange = useCallback((newSection) => {
        setSelectedSection(newSection);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        formJson['section_id'] = selectedSection.id
        formJson['priority_id'] = selectedPriority.id
        formJson['casetype_id'] = selectedType.id
        formJson['user_id'] = logginUser.id
        try {
            const response = await fetch(urlAPI + 'api/update-case/' + caseId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/cases/view/' + caseId)
            }
        }
        catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex overflow-auto mt-20">
                    <div className="w-full h-full bg-[#EAF1F7]">
                        <div className="text-left border-b px-4 py-2 font-medium">
                            <span className=" bg-purple-600 px-2 py-0.5  rounded-xl text-white select-none">C{caseId}</span>
                            {title}
                        </div>
                        <div className="p-4 text-sm">
                            <form autoComplete="off" onSubmit={handleSubmit} spellCheck={false}>
                                <div className="text-left mb-4">
                                    <label htmlFor="title" className="block">
                                        Title<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
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
                                            setSelectedOption={handleSectionChange}
                                        />
                                    </div>
                                    <div className="text-left">
                                        <label htmlFor="priority" className="block">
                                            Priority*
                                        </label>
                                        <Dropdown
                                            data={[{ id: 1, name: "Low" }, { id: 2, name: "Medium" }, { id: 3, name: "High" }, { id: 4, name: "Critical" }]}
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
                                            value={estimate}
                                            onChange={(e) => setEstimate(e.target.value)}
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
                                        rows={6}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2 py-1 text-xs"
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
                                        rows={6}
                                        value={precondition}
                                        onChange={(e) => setPrecondition(e.target.value)}
                                        className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
                                    />
                                    <p className="text-gray-400">The preconditions of this test case. Reference other test cases with [C#] (e.g. [C17]).
                                    </p>
                                </div>

                                {/* Steps */}
                                <div className="text-left mt-5">
                                    <label htmlFor="steps" className="block">Steps</label>
                                    <textarea
                                        name="step"
                                        type="text"
                                        rows={6}
                                        value={step}
                                        onChange={(e) => setStep(e.target.value)}
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
                                        rows={6}
                                        value={expectation}
                                        onChange={(e) => setExpectation(e.target.value)}
                                        className="border border-[#d2e2ed] rounded-sm outline-none w-full p-1"
                                    />
                                    <p className="text-gray-400">The expected result after executing the test case.</p>
                                </div>

                                <div className="flex gap-4 mt-4 mb-20">

                                    <button
                                        className="bg-[#049474] w-28 py-1 text-white"
                                    >
                                        Save Test Case</button>


                                    <button className="border border-red-500 w-28 py-1 text-red-500">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-64 bg-[#D2E2ED]">

                    </div>
                </div>


            </div>
        </>
    );
}
export default CaseEdit;