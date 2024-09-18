import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";

import Navbar from "../navBar";
import { BtnOK, BtnCancel } from "../Common/CustomButton";
import Dropdown from "../Common/Dropdown";
import { useGlobalVariables } from "../../Store/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import CaseSelectModal from "./Modal/CaseSelectModal";

function RunAdd() {

    const { projectId } = useParams();
    const { setGlobalProjectId, logginUser } = useGlobalVariables();
    const [showSelectModal, setShowSelectModal] = useState(false);

    useEffect(() => {
        setGlobalProjectId(projectId)
    })
    const navigate = useNavigate();


    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const toDay = moment.utc().format('DD/MM/YYYY');

    const [runTitle, setRunTitle] = useState('Test Run ' + toDay);

    const [assignedTo, setAssignedTo] = useState([]);
    const [selectedAssignedTo, setSelectedAsignedTo] = useState({ id: null, name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        formJson['created_by'] = logginUser.id;
        formJson['assigned_to'] = selectedAssignedTo.id;
        try {
            const response = await fetch(urlAPI + 'api/insert-run/' + projectId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/runs/overview/' + projectId)
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
            <div className="flex-grow flex  mt-20">
                <div className="w-full bg-[#EAF1F7]">
                    <div className="flex p-2 border-b-[1px] border-[#aecade] font-medium">
                        Add Test Run
                    </div>
                    <div className="p-4 text-sm">
                        <form autoComplete="off" onSubmit={handleSubmit} spellCheck={false}>
                            <div className="text-left mb-4">
                                <label htmlFor="title" className="block">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="run_name"
                                    type="text"
                                    value={runTitle}
                                    className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2 py-1"
                                    required={true}
                                    onChange={(e) => setRunTitle(e.target.value)}
                                />
                            </div>
                            <div className="text-left mb-4">
                                <label htmlFor="title" className="block">
                                    Assignted To
                                </label>
                                <div className="w-72">

                                    <Dropdown
                                        data={assignedTo}
                                        selectedOption={selectedAssignedTo}
                                        setSelectedOption={setSelectedAsignedTo}

                                    />
                                </div>

                            </div>

                            <div className="text-left mb-4">
                                <label htmlFor="title" className="block">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    type="text"
                                    rows={5}
                                    className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2 py-1"
                                />
                            </div>
                            <div className="text-left p-4 text-sm">
                                <div className="py-4">
                                    <p className="font-medium">Select specific test cases</p>
                                    <p>You can alternatively select the test cases to include in this test run. </p>
                                    <p>New test cases are not automatically added to this run in this case.</p>
                                </div>

                                <div className="bg-white border border-[#d2e2ed] w-80 px-2 py-1">
                                    <span className="font-medium" >0</span> test cases included (
                                        <button 
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => setShowSelectModal(true)}

                                        
                                        >change selection</button>
                                        )
                                </div>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <BtnOK name="Add Test Run" />
                                <BtnCancel href={urlWEB + "runs/overview/" + projectId} />
                            </div>
                        </form>
                    </div>


                </div>
                <div className="w-80 bg-[#d2e2ed]">

                </div>

            </div>
        </div>
        {showSelectModal && <CaseSelectModal
            projectId={projectId}
            setShowModal={setShowSelectModal}
        />}
        </>

    );
}


export default RunAdd;