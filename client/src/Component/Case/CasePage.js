import React, { useState, useEffect, useCallback } from "react";

import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link } from 'react-router-dom';

import SideBar from "./SideBar";
import SectionModalAdd from "./SectionAddModal";
import Dropdown from "../Common/Dropdown";
import Navbar from "../navBar";
import { FaCheck, FaXmark } from "react-icons/fa6";

function CasePage() {
    const { projectId } = useParams()
    console.log("MainPage rending .....,", projectId)

    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseData, setCaseData] = useState([]);

    const [showSectionModal, setShowSectionModal] = useState(false);
    const [typeSectionModal, setTypeSectionModal] = useState('insert');
    const [sectionFormData, setSectionFormData] = useState({
        'name': '',
        'description': '',
        'project_id': projectId,
        'level': 0
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
        setShowSectionModal(true);
        setTypeSectionModal('insert');
        setSectionFormData({
            'name': '',
            'description': '',
            'project_id': projectId,
            'level': 0
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
                const response = await fetch(urlAPI + 'api/create-section' ,{
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
                <Navbar />
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
                                            <SectionCase key={data.section_id} projectId={projectId} data={data} setCaseData={setCaseData} />
                                            {/* Level 1 */}
                                            <div className="border-l-2 border-gray-300 pl-5">
                                                {data.sub.map((level1) =>
                                                    <div>
                                                        <SectionCase data={level1} setCaseData={setCaseData} />
                                                        <div className="border-l-2 border-gray-300 pl-5">
                                                            {level1.sub.map((level2) =>
                                                                <SectionCase data={level2} setCaseData={setCaseData} />
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
                                                    className="text-[#5993bc] underline"
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
                showSectionModal &&
                <SectionModalAdd
                    typeSectionModal={typeSectionModal}
                    setModalshow={setShowSectionModal}
                    setCaseData={setCaseData}
                    sectionFormData={sectionFormData}
                    
                    />
            }

        </>

    )
}
export default CasePage;