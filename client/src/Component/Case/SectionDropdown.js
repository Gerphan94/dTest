import React, { useEffect, useRef, useState, memo } from 'react'
import { FaAngleDown } from "react-icons/fa6";

const SectionDropdown = memo(function SectionDropdown({ projectId, selectedOption, setSelectedOption, root=false }) {


    console.log('Render SectionDropdown')
    const urlAPI = process.env.REACT_APP_API_URL;

    const [sections, setSections] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);


    useEffect(() => {
        const fetchSections = async () => {
            try {
                const fetchUrl = urlAPI + "api/get-section-list/" + projectId;
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();
                
                setSections(data);
                setViewData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();

    }, [projectId, urlAPI]);



    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClick = (id, name) => {
        setSelectedOption({ id, name });
        setIsDropdownOpen(false);
        setSearchTerm('')
        setViewData(sections);

    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownOpen(true);
        if (e.target.value === '') {
            setViewData(sections);
        }
        else {
            const filedata = sections.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setViewData(filedata);
        }
    }

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

    const renderSections = (sections) => {
        return sections.map((section) => (
            <div>
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

    return (
        <div className='w-full h-full inline-block text-left' ref={dropdownRef}>
            <div className="relative inline-block w-full">
                <div className='relative group'>
                    <input
                        className={`border rounded-md select-none outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 }`}
                        onClick={toggleDropdown}
                        type='text'
                        value={selectedOption.name}
                        readOnly={true}
                    />
                    <div
                        className="absolute inset-y-0 right-0 pr-3  px-2 py-1 group-hover:border-blue-200 "
                        onClick={toggleDropdown}
                    >
                        <FaAngleDown className="h-5 w-5 text-gray-500 group-hover:text-blue-200 " />
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-full max-h-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ">

                        <div className='p-2'>
                            <input
                                className={`border outline-none h-full w-full py-1 px-2 text-[#0C1844] group-hover:border-blue-200 }`}
                                value={searchTerm}
                                onChange={handleChange}
                                placeholder='Search'
                                autoComplete='off'
                                spellCheck={false}
                            // readOnly={!searchable}
                            />
                        </div>

                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {viewData.length === 0 ?
                                <li className="">
                                    <button
                                        className="w-full text-left block px-4 py-2 text-sm text-[#0C1844] hover:bg-gray-100 select-none"
                                    >
                                        None
                                    </button>

                                </li> :
                                <>
                                    <div className='overflow-y-auto max-h-64'>
                                    {renderSections(viewData)}
                                    </div>
                                </>
                            }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
});

export default SectionDropdown;