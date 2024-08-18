import React, { useState, useEffect, useCallback } from "react";

import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link } from 'react-router-dom';

import SideBar from "./SideBar";
import SectionModal from "./SectionModal";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useProject } from "../../Store/ProjectProvider";

function CasePage() {
    const { projectId } = useParams()
    const { setProjectId } = useProject();
    useEffect(() => {
        setProjectId(projectId)
    })
    console.log("MainPage rending .....,", projectId)

    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseData, setCaseData] = useState([]);
    const [sideData, setSideData] = useState([]);

    const [sectionModal, setSectionModal] = useState({
        show: false,
        type: 'insert',
        formData: {
            'id': null,
            'name': '',
            'description': '',
            'project_id': projectId,
            'parent_id': 0
        }
    });

    const get_side_data = (array) => {
        let result = []
        for (let i = 0; i < array.length; i++) {
            result.push({ id: array[i]['section_id'], name: array[i]['section_name'] })
            return result
        }
    }

    const [showSectionAddForm, setShowSectionAddForm] = useState(false);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const fetchUrl = urlAPI + "api/get-case-by-project/" + projectId;
                console.log('--------', fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setCaseData(data);
                setSideData(get_side_data(data))
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCase();
    }, [projectId])

    const onClickAddSection = () => {
        setSectionModal({
            'show': true,
            'type': 'insert',
            'formData': {
                'name': '',
                'description': '',
                'project_id': projectId,
                'parent_id': 0
            }
        })
    }
    const handleSubmitSectionAdd = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            formJson['parent_id'] = 0
            formJson['project_id'] = projectId
            formJson['description'] = ''
            try {
                const response = await fetch(urlAPI + 'api/create-section', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    setShowSectionAddForm(false);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
        [urlAPI]
    );

    const renderSections = (sections) => {
        return sections.map((section) => (
            <div key={section.section_id}>
                <SectionCase
                    projectId={projectId}
                    data={section}
                    setCaseData={setCaseData}
                    sectionModal={sectionModal}
                    setSectionModal={setSectionModal}
                />
                {section.sub && section.sub.length > 0 && (
                    <div className="border-l-2 border-gray-300 pl-5">
                        {renderSections(section.sub)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <>
            <div className={styles.bodyPage} >
                <div className="h-full flex">
                    <div className={styles.SideBarHeight}>
                        <SideBar  sideData={sideData} />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="flex gap-4 p-2 h-14 border-b-2">
                            TestCase
                            <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                                to={`/cases/add/${projectId}`}>Add Case</Link>
                        </div>
                        <div className="">
                            <div className=" py-2 px-5 mb-40">
                                {renderSections(caseData)}

                                <div className="text-left">
                                    <button
                                        className="text-[#5993bc] underline select-none"
                                        onClick={() => onClickAddSection()}
                                    >Add Section</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {sectionModal['show'] &&
                <SectionModal
                    sectionModal={sectionModal}
                    setSectionModal={setSectionModal}
                    setData={setCaseData}
                />
            }
        </>
    )
}
export default CasePage;