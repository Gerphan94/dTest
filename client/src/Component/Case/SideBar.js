import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';



function SideBar({ setProject, projectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + 'projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                console.log('..')
            }

        }
        fetchProject();
    }, []);

    return (

        <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
            <div className="">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/cases/${project.id}`}
                        className={`w-full block text-left px-4 py-2 ${parseInt(project.id) === parseInt(projectId)  ? 'bg-[#1890FF]' : ''} hover:bg-blue-400`}
                    >
                        {console.log('projectId', typeof(projectId), projectId)}
                        {console.log(typeof(project.id), project.id)}
                        {project.name}
                    </Link>

                ))}
            </div>
        </div>

    )


}


export default SideBar;