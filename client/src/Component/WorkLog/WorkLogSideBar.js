import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';


function SideBar() {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;


    const [months, setMonths] = useState([]);

    const formatMonth = (stringDate) => {
        const year = stringDate.slice(0, 4);
        const month = stringDate.slice(4, 6);
        return `${month}/${year}`;
        
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-worklog-month");
                const data = await response.json();
                setMonths(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, []);





    return (
        <>
            <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
                <div className="p-4">
                    {months.map((ele) => (
                        <a 
                        href= {`${urlWEB}work-log/${ele}`} className="w-full block text-left px-4 py-2 "
                          >{formatMonth(ele)}</a>
                    ))}
                    

            
                   
                </div>
            </div>
        </>



    )

}


export default SideBar;