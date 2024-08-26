import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


function SideBar({ projectId, sideData, handleScroll }) {


    const urlAPI = process.env.REACT_APP_API_URL;

    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-section-list/" + projectId);
                const data = await response.json();
                setSections(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();


    }, []);

    const renderSections = (sections) => {
        return sections.map((section) => (
            <div className="border-l">
                <button
                    className="w-full text-left block px-2 py-1 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                    onClick={() => handleClick(section.id, section.name)}
                >
                    {section.name}
                </button>
                {
                    section.sub && section.sub.length > 0 && (
                        <div className=" border-gray-300 ml-2">
                            {renderSections(section.sub)}
                        </div>
                    )
                }
            </div>
        ));
    };


    const [selected, setSelected] = useState(0);

    const handleClick = (id) => {
        setSelected(id);
        handleScroll(id);
    };

    return (
        <>
            <div className="bg-[#d2e2ed] w-64  text-[#0e3754]">
                <div className="p-3 w-full flex justify-center">
                    <Link className="w-40 text-white px-4 py-1 flex gap-2 items-center justify-center bg-[#376789]" to="/dashboard">
                        {/* <FaPlus /> */}
                        Add Test Case
                    </Link>
                </div>
                <div className="text-left p-2">
                    <p className="text-sm text-black">Contains <strong>XX</strong> sections and <strong>YYY</strong> cases.</p>
                </div>

                <div className="p-2 sticky top-2">
                    <div className=" bg-white sticky mt-20">
                        <div className="flex justify-center">
                           
                            <button>Add Section</button>

                        </div>
                        {renderSections(sections)}

                    </div>
                </div>

            </div>
        </>
    )

}


export default SideBar;