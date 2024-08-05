import React, { useState, useEffect, useCallback } from "react";

import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link } from 'react-router-dom';

import SideBar from "./SideBar";
import SectionModalAdd from "./SectionAddModal";
import Dropdown from "../Common/Dropdown";

import { FaCheck, FaXmark } from "react-icons/fa6";

function CasePage() {
    console.log("MainPage rending .....")
    const { projectId } = useParams()
    const urlAPI = process.env.REACT_APP_API_URL;

    const [caseData, setCaseData] = useState([]);
    const [SectionModalShow, setSectionModalShow] = useState(false);

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


    const onSubmitSection = (data) => {
        console.log(data)
    }

    return (
        <div className="h-full overflow-y-hidden text-sm">
            <div className="flex bg-slate-50 ">
                <div className={styles.SideBarHeight}>
                    <SideBar projectId={projectId} />
                </div>
                <div className={styles.MainPage}>
                    <div className="flex gap-4 p-2 h-14 border-b-2">
                        <div className="flex flex-wrap content-center font-bold text-lg uppercase w-40">TÊN PROJECT</div>
                        <div className="flex flex-wrap content-center font-bold ml-10">Module</div>
                        <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                            to={`/cases/add/${projectId}`}>Add Case</Link>
                    </div>
                    <div className={styles.casePage}>
                        <div className="py-2 px-5 mb-40">
                            {caseData.map((data) =>
                                <div >
                                    <SectionCase key={data.section_id} data={data} setCaseData={setCaseData} />
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
                                    <form method="post" onSubmit={(e) => onSubmitSection(e)} autoComplete='off'>
                                        <div className="flex items-center gap-2">
                                            <div>Name</div>
                                            <input
                                                type="text"
                                                className="rounded-md border outline-none px-2 py-0.5 w-[600px]"
                                                name="case_title"
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
                                            onClick={() => setShowSectionAddForm(true)}
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


            {
                SectionModalShow &&
                <SectionModalAdd
                    parentSectionId={0} level={0}

                    setNewSectionModalShow={setSectionModalShow}
                    setCaseData={setCaseData} />
            }


        </div >

    )
}
export default CasePage;