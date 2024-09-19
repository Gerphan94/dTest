import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line, RiAlignJustify } from "react-icons/ri";
import { useCookies } from 'react-cookie';

const UserMore = ({ setLoggedIn }) => {

    // const urlAPI = process.env.REACT_APP_API_URL;

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        setIsDropdownOpen(false);

    };

    const handleLogout = () => {
        removeCookie('token');
        setLoggedIn(false);
    }



    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };


    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className='w-full items-center inline-block' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='flex items-center'>
                    <button className='w-full h-full p-1'
                        onClick={toggleDropdown}>
                        <RiAlignJustify className='w-full h-full' />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-32 max-h-96 shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-y-auto">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <button
                                    className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-gray-100 select-none"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserMore;