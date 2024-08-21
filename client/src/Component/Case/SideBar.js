import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


function SideBar({ sideData , handleScroll}) {


    const [selected, setSelected] = useState(0);

    const handleClick = (id) => {
        setSelected(id);
        handleScroll(id);
    };


    return (
        <>
            <div className="bg-[#d2e2ed] w-64 h-screen text-[#0e3754] overflow-hidden">
                <div className="p-3 w-full">
                <Link className="w-40 text-white px-4 py-1 flex gap-2 items-center justify-center bg-[#376789]" to="/dashboard">
                    <FaPlus />

                Add Test Case

                </Link>
                </div>
                
                <div className="py-4">
                    {sideData.map((item) => (
                        <button
                            key={item.id}
                            className={`w-full block text-left px-4 py-1 text-sm hover:bg-[#7FA1C3] ${selected === item.id ? 'bg-[#7FA1C3]' : ''}  `}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )

}


export default SideBar;