import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

<<<<<<< HEAD
function SideBar({ projectId }) {
    const urlAPI = process.env.REACT_APP_API_URL;
    const [treeData, setTreeData] = useState([]);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const fetchUrl = urlAPI + "api/initSectionTree/" + projectId;
                console.log(fetchUrl)
                const response = await fetch(urlAPI + "api/initSectionTree/" + projectId);
=======


function SideBar({ setProject, projectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + 'projects');
>>>>>>> 5d0a2b11434ebbf7cc5a0ea3a9b257006d8145d1
                const data = await response.json();
                setTreeData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, [projectId, urlAPI])

    return (

        <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
            <div className="">
                {treeData.map((item) => (
                    <Link
                        key={item.id}
                        // to={`/cases/${project.id}`}
                        className={`w-full block text-left px-4 py-2 `}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>

    )


}


export default SideBar;