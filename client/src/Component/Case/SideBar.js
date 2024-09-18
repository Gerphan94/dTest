import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcExpand, FcCollapse, FcMinus } from "react-icons/fc";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";


function SideBar({ projectId, sideData, handleScroll, totalSection, totalCase }) {

    const urlAPI = process.env.REACT_APP_API_URL;
    console.log('totalSection', totalSection, 'totalCase', totalCase)

    const [sections, setSections] = useState([]);

    const addShowProperty = (sections) => {
        return sections.map(section => ({
            ...section,
            'show': false,
            sub: section.sub ? addShowProperty(section.sub) : []
        }));
    };
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-section-list/" + projectId);
                const data = await response.json();
                setSections(addShowProperty(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSections();
    }, []);

    const RenderSections = (sections) => {

        const handleClick = (sectionId) => {
            setSections((prevSections) =>
                prevSections.map(section => {
                    if (section.id === sectionId) {
                        return {
                            ...section,
                            show: !section.show,
                        };
                    }
                    if (section.sub && section.sub.length > 0) {
                        return {
                            ...section,
                            sub: section.sub.map(subSection => {
                                if (subSection.id === sectionId) {
                                    return {
                                        ...subSection,
                                        show: !subSection.show,
                                    };
                                }
                                return subSection;
                            }),
                        }
                    }
                    return section;
                })
            );
        };

        return sections.map((section) => (
            <div key={section.id}>
                <div className="flex items-center">
                    {section.sub && section.sub.length > 0 ? (
                        section['show'] ? (
                            <span className="px-1 py-0.5">
                                <FcCollapse className="text-xs" onClick={() => handleClick(section.id)} />
                            </span>

                        ) : (
                            <span className="pl-1 py-0.5">
                                <FcExpand className="text-xs" onClick={() => handleClick(section.id)} />
                            </span>
                        )
                    )
                        :
                        (
                            <span className="px-1 py-0.5 text-white">
                                <FcMinus className="text-xs " />
                            </span>
                        )

                    }
                    <button
                        className="w-full text-left block px-2 py-0.5 text-sm text-[#0C1844] hover:bg-[#667BC6] select-none"
                        onClick={() => handleClickSection(section.id)}
                    >
                        {section.name}
                    </button>
                </div>
                {section['show'] && section.sub && section.sub.length > 0 && (
                    <div className="border-gray-300 ml-3">
                        {RenderSections(section.sub)} {/* Recursive call to render subsections */}
                    </div>
                )}
            </div>
        ));
    };


    const [selected, setSelected] = useState(0);

    const handleClickSection = (id) => {
        setSelected(id);
        handleScroll(id);
    };

    return (
        <>
            <div className="bg-[#d2e2ed] w-80  text-[#0e3754]">
                <div className="p-3 w-full flex justify-center">
                    <Link className="w-40 text-white px-4 py-1 flex gap-2 items-center justify-center bg-[#376789]" to="/dashboard">
                        {/* <FaPlus /> */}
                        Add Test Case
                    </Link>
                </div>
                <div className="text-left p-2">
                    <p className="text-sm text-black">Contains <strong>{totalSection}</strong> sections and <strong>{totalCase}</strong> cases.</p>
                </div>

                <div className="p-2 sticky top-4">
                    <div className=" bg-white mt-20 overflow-y-auto h-[600px]">
                        <div className="flex justify-center">
                            <button>Add Section</button>
                        </div>
                        {RenderSections(sections)}

                    </div>
                </div>

            </div>
        </>
    )

}


export default SideBar;