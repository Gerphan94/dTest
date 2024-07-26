import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';




function SideBar({ setProject, projectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [projects, setProjects] = useState([])
    const   [treeData, setTreeData] = useState([])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + 'projects');
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