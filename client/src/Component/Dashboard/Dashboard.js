import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcBriefcase } from "react-icons/fc";
import { useGlobalVariables } from "../../Store/AppContext";

function Dashboard() {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const { setProjectId } = useGlobalVariables();
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchUrl = urlAPI + 'api/get-all-projects';
        const fetchProject = async () => {
            try {
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setProjects(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        setProjectId(0);
        fetchProject();
    }, []);

    const handleClick = (id) => {
        setProjectId(id)
        navigate('/project/overview/' + id)
    }

    return (
        <>
            <div className={styles.bodyPage} >
                <div className="flex flex-row">
                    <div className="w-full bg-[#EAF1F7]">

                        <div className="w-full text-left border-b py-2 px-4 font-bold">Projects</div>

                        <div className="p-4">
                            {location.state?.eMessage &&
                                <div className="py-1">
                                    <div className="rounded-sm border border-[#e40046] bg-[#f4e0e0] p-1 text-left">{location.state.eMessage}</div>
                                </div>
                            }
                            {projects.map((item) => (
                                <>

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
                                                <Link to={'/cases/view/' + item.id}>Test Cases</Link>|
                                                <Link to={'/project/overview/' + item.id}>Reports</Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="w-56 h-screen bg-slate-500">

                    </div>
                </div>

            </div>


        </>
    )
}
export default Dashboard;