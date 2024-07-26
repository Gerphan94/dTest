import React, { useState, useEffect, useCallback } from "react";

import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link } from 'react-router-dom';

import SideBar from "./SideBar";
import SectionModalAdd from "./SectionModalAdd";
import Dropdown from "../Common/Dropdown";


function CasePage() {
    console.log("MainPage rending .....")
    const { projectId } = useParams()
    const urlAPI = process.env.REACT_APP_API_URL;
    console.log(urlAPI)

    const [caseData, setCaseData] = useState([]);
    const [SectionModalShow, setSectionModalShow] = useState(false);

    useEffect (() => {
        const fetchCase = async () => {
            try {
                const fetchUrl = urlAPI + "api/getCasesByProject/" + projectId;
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
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

        fetchCase();
    },[projectId])
    


 
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
                    
                        {/* <Dropdown /> */}

                        <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                            to={`/cases/add/${projectId}`}>Add Case</Link>
                    </div>
                    <div className={styles.casePage}>
                        <div className="py-2 px-5">
                            {caseData.map((data) =>
                                <div >
                                    <SectionCase key={data.section_id} data={data}  setCaseData={setCaseData} />
                                    {/* Level 1 */}
                                    <div className="border-l-2 border-gray-300 pl-5">
                                        {data.sub.map((level1) =>
                                            <div>
                                                <SectionCase data={level1}  setCaseData={setCaseData} />
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