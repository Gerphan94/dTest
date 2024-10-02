import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles.module.css"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcBriefcase } from "react-icons/fc";
import { useGlobalVariables } from "../../Store/AppContext";
import Navbar from "../navBar";
import { FaPlus } from "react-icons/fa6";
import AddProjectModal from "./AddProjectModal";

const Dashboard = React.memo(() => {
    console.log('fetChing Dashboard')

    const urlAPI = useMemo(() => process.env.REACT_APP_API_URL, []);
    const urlWEB = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const { setGlobalProjectId } = useGlobalVariables();
    const [projects, setProjects] = useState([])

    const [showAddProjectModal, setShowAddProjectModal] = useState(false);


    useEffect(() => {
        const fetchUrl = urlAPI + 'api/get-all-projects';
        async function fetchProject() {
            if (projects.length === 0) { // Only fetch if projects is empty
                try {
                    const response = await fetch(fetchUrl);
                    const data = await response.json();
                    setProjects(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchProject();
    }, [projects, urlAPI]);

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex overflow-auto mt-20">
                    <div className="w-full bg-[#EAF1F7]">
                        <div className="w-full text-left border-b py-2 px-4 font-bold">Projects</div>
                        <div className="p-4 flex flex-col gap-2">
                            {location.state?.eMessage && (
                                <div className="rounded-sm border border-[#e40046] bg-[#f4e0e0] p-1 text-left">
                                    {location.state.eMessage}

                                </div>
                            )}
                            {projects.map((item) => (
                                <div key={item.id} className="flex gap-1 border rounded-md mt-2 p-3 bg-white"  >
                                    <div className="px-4 py-1">
                                        <FcBriefcase className="size-8" />
                                    </div>

                                    <div className="text-left">
                                        <div>
                                            <Link className="font-medium hover:underline" to={'/project/overview/' + item.id}>{item.name}</Link>
                                        </div>

                                        <div className="flex gap-1 text-xs text-[#5993bc] underline">
                                            <Link to={'/runs/overview/' + item.id}>Test Runs</Link>|
                                            <Link to={'/suites/view/' + item.id}>Test Cases</Link>|
                                            <Link to={'/project/overview/' + item.id}>Reports</Link>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="bg-[#d2e2ed] w-80 p-4">
                        <button
                            className="w-40 text-white px-4 py-1 flex gap-2 items-center justify-center bg-[#376789]"
                            onClick={() => setShowAddProjectModal(true)}


                        >
                            <FaPlus />
                            Add Project
                        </button>

                    </div>
                </div>
            </div>

            {showAddProjectModal && (
                <AddProjectModal
                    setShowModal={setShowAddProjectModal}
                />
            )}
        </>
    )
});
export default Dashboard;