import React, { useState, useEffect } from "react";

function SideBar() {

    const URL = "http://127.0.0.1:5000/api/"
    const [projects, setProjects] = useState(["One", "Two", "Three"])

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(URL + 'projects');
                const data = await response.json();
                setProjects(data);
                console.log('chekcing-----', data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                console.log('..')
            }
    
        }
        fetchProject();
    }, [])

    

    return (
        
        <div className="bg-blue-300 w-48 h-screen">
    <div className="p-4">
        {projects.map((project, index) => (
            <button key={index} className="w-full block text-left p-2 hover:bg-blue-400">
                {project.name}
            </button>
        ))}
    </div>
</div>

    
        
    )


}


export default SideBar;