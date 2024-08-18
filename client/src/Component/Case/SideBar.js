import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';




function SideBar({ sideData }) {

    console.log("sidedata is -------------",  sideData)

    return (
        <>
            <div className="bg-[#d2e2ed] w-48 h-screen text-[#0e3754] overflow-hidden">
                <div className="">
                    {sideData.map((item) => (
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