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
    setProjectId(projectId)

    console.log("MainPage rending .....,", projectId)

    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseData, setCaseData] = useState([]);

    const [sectionModal, setSectionModal] = useState({
        show: false,
        type: 'insert',
        formData: {
            'name': '',
            'description': '',
            'project_id': projectId,
            'level': 0,
            'parent_id': 0
        }
    });


    const [showSectionAddForm, setShowSectionAddForm] = useState(false);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const fetchUrl = urlAPI + "api/get-case-by-project/" + projectId;
                console.log('--------', fetchUrl)
                const response = await fetch(fetchUrl);
                const data = await response.json();
                setCaseData(data);
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
                'level': 0,
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
            formJson['level'] = 0
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

    return (
        <>
            {/* <Navbar /> */}
            <div className={styles.bodyPage} >
                <div className="h-full flex">
                    <div className={styles.SideBarHeight}>
                        <SideBar projectId={projectId} />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="flex gap-4 p-2 h-14 border-b-2">
                            TestCase
                            <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                                to={`/cases/add/${projectId}`}>Add Case</Link>
                        </div>
                        <div className="">
                            <div className="py-2 px-5 mb-40">
                                {caseData.map((data) =>
                                    <div >
                                        <SectionCase
                                            key={data.section_id}
                                            projectId={projectId}
                                            data={data}
                                            setCaseData={setCaseData}
                                            sectionModal={sectionModal}
                                            setSectionModal={setSectionModal}
                                        />
                                        {/* Level 1 */}
                                        <div className="border-l-2 border-gray-300 pl-5">
                                            {data.sub.map((level1) =>
                                                <div>
                                                    <SectionCase
                                                        key={level1.section_id}
                                                        projectId={projectId}
                                                        data={level1}
                                                        setCaseData={setCaseData}
                                                        sectionModal={sectionModal}
                                                        setSectionModal={setSectionModal}
                                                    />
                                                    <div className="border-l-2 border-gray-300 pl-5">
                                                        {level1.sub.map((level2) =>
                                                            <SectionCase
                                                                key={level2.section_id}
                                                                projectId={projectId}
                                                                data={level2}
                                                                setCaseData={setCaseData}
                                                                sectionModal={sectionModal}
                                                                setSectionModal={setSectionModal}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-2 mt-4">

                                    {showSectionAddForm ?
                                        <form method="post" onSubmit={(e) => handleSubmitSectionAdd(e)} autoComplete='off'>
                                            <div className="flex items-center gap-2">
                                                <div className="text-gray-400">Name</div>
                                                <input
                                                    type="text"
                                                    className="border outline-none px-2 py-0.5 w-[600px]"
                                                    name="section_name"
                                                    required={true}
                                                />
                                                <button type="submit">
                                                    <FaCheck
                                                        className="bg-green-600 border border-green-600 p-1 text-white size-full rounded-sm cursor-pointer opacity-80 hover:opacity-100"
                                                    />
                                                </button>
                                                <button type="button">
                                                    <FaXmark
                                                        className="bg-white border border-red-500 p-1 text-red-500 size-full rounded-sm cursor-pointer opacity-80 hover:opacity-100"
                                                        onClick={() => setShowSectionAddForm(false)}
                                                    />
                                                </button>
                                            </div>
                                        </form>
                                        :
                                        <div className="flex gap-2">
                                            <button
                                                className="text-[#5993bc] underline select-none"
                                                onClick={() => onClickAddSection()}
                                            >
                                                Add section
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {
                sectionModal['show'] &&
                <SectionModal
                    sectionModal={sectionModal}
                    setSectionModal={setSectionModal}
                    setCaseData={setCaseData}

                />
            }

        </>

    )
}
export default CasePage;