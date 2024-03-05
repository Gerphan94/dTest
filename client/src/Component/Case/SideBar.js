import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';



function SideBar({ setProject, projectId }) {

    const URL = "http://127.0.0.1:5000/api/"
    const [projects, setProjects] = useState([])

    console.log("PROJECT ID IS: ", projectId);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(URL + 'projects');
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

        <div className="bg-[#001529] w-48 h-screen text-white">
            <div className="">
                {projects.map((project) => (
                    <Link
                        to={`/cases/${project.id}`}
                        className={`w-full block text-left px-4 py-2 hover:bg-blue-400 ${project.id === projectId ? "bg-[#1890FF]" : ""}`}
                    >
                        {project.name}
                    </Link>

                ))}
            </div>
        </div>

    )


}


export default SideBar;