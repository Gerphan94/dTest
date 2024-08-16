import React, { useEffect, useState } from "react";
import Navbar from "../navBar";
import styles from "../styles.module.css"
function Dashboard({ setProjectId }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

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
        fetchProject();
    }, []);

    const handleClick = (id) => {
        setProjectId(id);
        window.location.href = urlWEB + 'project/overview/' + id
        console.log('TÔI ĐÃ CLICK VÀ LẤY ID = ', id)
    }

    return (
        <>  
            <div className="">
            {/* <Navbar /> */}
            <div>
            <Navbar />
                <div>Project</div>
                <div className="p-4">
                    {projects.map((item) => (
                        <div key={item.id} className="w-full border rounded-md mb-4 text-left p-4">
                            <div
                                className="text-left p-2 hover:underline"
                                onClick={() => handleClick(item.id)}

                            >{item.name}</div>
                        </div>
                    ))}
                </div>

            </div>
            </div>
            

        </>
    )
}
export default Dashboard;