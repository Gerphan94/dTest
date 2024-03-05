import React, { useState, useEffect, useCallback } from "react";
import SideBar from "./SideBar";
import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useParams, Link } from 'react-router-dom';

function CasePage() {

    const { projectId } = useParams();

    const urlAPI = "http://127.0.0.1:5000/api/";

    const [project, setProject] = useState({});
    const [curModule, setCurModule] = useState(null);
    const [caseData, setCaseData] = useState([]);
    const [isShowSectionForm, setisShowSectionForm] = useState(false);

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


    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(urlAPI + "modules/" + project['id']);
                const data = await response.json();
                const modules = []
                data.forEach(element => {
                    modules.push({ value: element.id, label: element.name })
                });
                setModulesOptions(modules)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchModule();
    }, [project['id']])

    const handleChangeModule = (selectedOption) => {
        // Handle the selected option here
        const selectedModule = selectedOption.value;
        document.title = "Test Case - " + selectedOption.label;
        setCurModule(selectedOption.value);
        const fetchCase = async () => {
            try {
                const response = await fetch(urlAPI + "cases_by_module/" + selectedModule);
                const data = await response.json();
                setCaseData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCase();


    };

    const handleSubmitSection = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());

            formJson['p_section_id'] = 0;
            formJson['level'] = 0;
            console.log(formJson);
            try {
                const response = await fetch(urlAPI + 'add_section/' + curModule, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    setisShowSectionForm(false);

                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }, [curModule]);

    return (
        <div className="h-full overflow-y-hidden">

            <div className="flex bg-slate-50 ">
                <SideBar setProject={setProject} projectId={projectId} />
                <div className={styles.MainPage}>
                    <div className="flex gap-4 p-2 border-b-2">
                        <div className="flex flex-wrap content-center font-bold text-lg uppercase w-40">{project['name']}</div>

                        <div className="flex flex-wrap content-center font-bold ml-10">Module</div>
                        <Select
                            className="text-left w-56"
                            options={modulesOptions}
                            onChange={handleChangeModule}
                        />
                        <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0" 
                        to={`/cases/add/${curModule}`}>Add Case</Link>

                    </div>
                    <div className="py-2 px-4">
                        {caseData.map((data) =>
                            <div key={data.section_id}>
                                <SectionCase section_id={data.section_id} section_name={data.section_name} cases={data.cases} curModule={curModule} />
                                {/* Level 1 */}
                                <div className="ml-2 border-l-2 border-gray-300 pl-4">
                                    {data.sub.map((level1) =>

                                        <SectionCase section_id={level1.section_id} section_name={level1.section_name} cases={level1.cases} curModule={curModule} />



                                    )}
                                </div>
                            </div>
                        )}
                        {curModule &&
                            <div className="text-left">
                                {isShowSectionForm ?
                                    <form method="post" onSubmit={(e) => handleSubmitSection(e)} autoComplete='off'>
                                        <div className="flex items-center gap-2">

                                            <div>Section</div>
                                            <input
                                                type="text"
                                                className="rounded-md border outline-none px-2 py-1"
                                                name="section_name"
                                                required={true}

                                            />
                                            <button type="submit">
                                                <FaCheck
                                                    className="bg-green-600 p-1 text-white w-8 h-8 rounded-sm cursor-pointer"
                                                />
                                            </button>
                                            <button type="button">
                                                <FaXmark
                                                    className="bg-white border border-red-500 p-1 text-red-500 w-8 h-8 rounded-sm cursor-pointer"
                                                    onClick={() => setisShowSectionForm(false)}
                                                />
                                            </button>

                                        </div>
                                    </form>
                                    :
                                    <button className="text-blue-300 hover:underline" onClick={() => setisShowSectionForm(true)}>Add Section</button>
                                }
                            </div>
                        }
                    </div>


                </div>

            </div>
        </div>

    )
}
export default CasePage;