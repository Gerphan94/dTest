import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";

const StatusDropdown = ({ selectedOption }) => {

    const [viewData, setViewData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState('bottom'); // Track dropdown position (top or bottom)
    const dropdownRef = useRef(null);

    const statusOpt = [
        { 'id': 2, 'name': 'Passed' },
        { 'id': 3, 'name': 'Failed' },
        { 'id': 4, 'name': 'Blocked' },
        { 'id': 5, 'name': 'Retest' }
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        // setSelectedOption({ id, name });
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            // Check the dropdown position when opened
            const dropdownElement = dropdownRef.current;
            const dropdownRect = dropdownElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // If the dropdown is too close to the bottom of the viewport, show it on top
            if (dropdownRect.bottom > windowHeight - 200) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }

            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className=' h-full inline-block text-left' ref={dropdownRef}>
            <div className="relative inline-block">
                <div className='relative group'>
                    <div
                        className={`border select-none outline-none h-full w-full rounded-xl flex items-center justify-between py-0.5 px-2 text-white group-hover:border-blue-200 ${selectedOption.id === 1 ? 'bg-[#737373]' : selectedOption.id === 2 ? 'bg-[#338A41]' : selectedOption.id === 3 ? 'bg-[#A9093A]' : selectedOption.id === 4 ? 'bg-[#474747]' : 'bg-[#B99109]' }`}
                        onClick={toggleDropdown}
                    >
                        
                        <span>{selectedOption?.name || 'Select Status'}</span>
                        <span
                            className="flex items-center ml-1"
                            onClick={toggleDropdown}
                        >
                            <FaAngleDown className="h-5 w-5 text-white0" />
                        </span>
                    </div>

                </div>

                {isDropdownOpen && (
                    <div
                        className={`origin-top-right absolute ${dropdownPosition === 'top' ? 'bottom-full' : 'top-full'} left-0 mt-2 w-48 max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
                    >
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {statusOpt.map((item) => (
                                <li key={item.id}>
                                    <button
                                        className="w-full text-left flex items-center px-4 py-2 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none border-b-2"
                                        onClick={() => handleClick(item.id, item.name)}
                                    >
                                        <span className={`nline-block w-3 h-3 rounded-full mr-2 ${item.id === 1 ? 'bg-[#737373]' : item.id === 2 ? 'bg-[#338A41]' : item.id === 3 ? 'bg-[#A9093A]' : item.id === 4 ? 'bg-[#474747]' : 'bg-[#B99109]' }`}></span>
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StatusDropdown;
