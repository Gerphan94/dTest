import React, { useState, useEffect } from "react";


function SideBar({ sideData , handleScroll}) {


    const [selected, setSelected] = useState(0);

    const handleClick = (id) => {
        setSelected(id);
        handleScroll(id);
    };


    return (
        <>
            <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
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