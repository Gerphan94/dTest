import React, { useState, useEffect, useCallback } from "react";

import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useParams, Link } from 'react-router-dom';

import SideBar from "./SideBar";
import SectionModalAdd from "./SectionModalAdd";

function CasePage() {

    const { projectId } = useParams();

    const urlAPI = "http://127.0.0.1:5000/api/";

    const [project, setProject] = useState({});
    const [curModule, setCurModule] = useState(null);
    const [caseData, setCaseData] = useState([]);
    const [SectionModalShow, setSectionModalShow] = useState(false);
    const [modulesOptions, setModulesOptions] = useState([]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(urlAPI + "project_by_id/" + projectId);
                const data = await response.json();

                setProject(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchProject();
    }, [projectId])



    const fetchCase = async () => {
        console.log("module is", curModule)
        try {
            const response = await fetch(urlAPI + "cases_by_module/" + curModule);
            const data = await response.json();
            
            if (data) {
                setCaseData(data);
            }
            else {
                setCaseData([])
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchModule = async () => {
        try {
            const response = await fetch(urlAPI + "modules/" + projectId);
            const data = await response.json();
            const modules = []
            data.forEach(element => {
                modules.push({ value: element.id, label: element.name })
            });
            if (modules.length > 0) {
                setModulesOptions(modules);
                setCurModule(modules[0].value);
            }
            else {
                setModulesOptions([]);
                setCurModule(null);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (curModule) {
            fetchCase();
        }

    }, [curModule])

    useEffect(() => {
        if (projectId) {
            fetchModule(); 
            
        }

    }, [projectId])

    const handleChangeModule = (selectedOption) => {
        // Handle the selected option here
        const selectedModule = selectedOption.value;
        setCurModule(selectedOption.value);
        fetchCase();
    };
    return (
        <div className="h-full overflow-y-hidden text-sm">
            <div className="flex bg-slate-50 ">
                <div className={styles.SideBarHeight}>
                    <SideBar setProject={setProject} projectId={projectId} />

                </div>
                <div className={styles.MainPage}>
                    <div className="flex gap-4 p-2 border-b-2">
                        <div className="flex flex-wrap content-center font-bold text-lg uppercase w-40">{project['name']}</div>

                        <div className="flex flex-wrap content-center font-bold ml-10">Module</div>
                        <Select
                            className="text-left w-56"
                            options={modulesOptions}
                            value={modulesOptions[0]}
                            onChange={handleChangeModule}
                        />
                        <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                            to={`/cases/add/${curModule}`}>Add Case</Link>
                    </div>
                    <div className="py-2 px-4 overflow-y-auto h-[600px]">
                        {caseData.map((data) =>
                            <div >
                                <SectionCase key={data.section_id} data={data} curModule={curModule} setCaseData={setCaseData} />

                                {/* Level 1 */}
                                <div className="ml-2 border-l-2 border-gray-300 pl-4">
                                    {data.sub.map((level1) =>
                                        <SectionCase data={level1} curModule={curModule} setCaseData={setCaseData} />
                                    )}
                                </div>
                            </div>
                        )}
                        {curModule &&
                            <div className="text-left mb-28">
                                <button
                                    className="text-blue-300 hover:underline"
                                    onClick={() => setSectionModalShow(true)}
                                >
                                    Add Section
                                </button>
                            </div>
                        }
                    </div>


                </div>
            </div>


            {SectionModalShow &&
                <SectionModalAdd parentSectionId={0} level={0} curModule={curModule} setSectionModalShow={setSectionModalShow} setCaseData={setCaseData} />
            }


        </div>

    )
}
export default CasePage;