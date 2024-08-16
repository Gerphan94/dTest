import React, { useEffect, useState } from "react";
import Navbar from "../navBar";
import styles from "../styles.module.css"
import { useProject } from "../../Store/ProjectProvider";
import { useNavigate } from 'react-router-dom';

function Dashboard(   ) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const { setProjectId } = useProject();
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
           
            {/* <Navbar /> */}
            <div className={styles.bodyPage} >

                <div>Project</div>
                <div className="p-4">
                    {projects.map((item) => (
                        <div key={item.id} className="w-full border rounded-md mb-4 text-left p-4">
                            <button
                                className="text-left p-2 hover:underline"
                                onClick={() => handleClick(item.id)}

                            >{item.name}</button>
                        </div>
                    ))}
                </div>

            </div>
            

        </>
    )
}
export default Dashboard;