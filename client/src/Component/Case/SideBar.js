import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';




function SideBar({ setProject, projectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const [rootSections, setRootSections] = useState([])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const fetchUrl = urlAPI + 'api/get-root-sections/' + projectId;
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setRootSections(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, [projectId, urlAPI])

    return (
        <>
            <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
                <div className="">
                    {rootSections.map((item) => (
                        <Link
                            key={item.id}
                            className={`w-full block text-left px-4 py-2 `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>



    )

}


export default SideBar;