import React, { useState, useEffect, useCallback, useContext, useRef, createRef } from "react";
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link } from 'react-router-dom';
import { useGlobalVariables } from "../../Store/AppContext";
import SideBar from "./SideBar";
import SectionModal from "./SectionModal";
import { FaCheck, FaXmark } from "react-icons/fa6";

function CasePage() {

    const { projectId } = useParams()
    const { setProjectId, logginUser } = useGlobalVariables();
    useEffect(() => {
        setProjectId(projectId)
    })
    console.log("CasePage rending with projectId is ", projectId)
    const urlAPI = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
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
        console.log(array)
        for (let i = 0; i < array.length; i++) {
            result.push({ id: array[i]['section_id'], name: array[i]['section_name'] }) 
        }
        return result
    }

    const [showSectionAddForm, setShowSectionAddForm] = useState(false);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const fetchUrl = urlAPI + "api/get-case-by-project/" + projectId;
                const response = await fetch(fetchUrl);
                const responseData = await response.json();
                setData(responseData);
                setSideData(get_side_data(responseData))
               
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
    const refs = useRef({});
    if (!Object.keys(refs.current).length) {
        sideData.forEach((item) => {
          refs.current[item['id']] = React.createRef();
        });
      }

    
      const handleScroll = (id) => {
        console.log('clicking on ', id, 'ref:', refs.current[id]);
        if (refs.current[id] && refs.current[id].current) {
            refs.current[id].current.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('Ref not found for id:', id);
        }
    };

    

    const renderSections = (sections) => {
        return sections.map((section) => (
            <div key={section.section_id}>
                <SectionCase
                    ref={refs.current[section['section_id']]}
                    projectId={projectId}
                    data={section}
                    setData={setData}
                    sectionModal={sectionModal}
                    setSectionModal={setSectionModal}
                    logginUser={logginUser}
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
                        <SideBar  sideData={sideData} handleScroll={handleScroll} />
                    </div>
                    <div className={styles.MainPage}>
                        <div className="flex gap-4 p-2 h-14 border-b-2">
                            TestCase
                            <Link className="bg-[#376789] w-40 flex items-center justify-center text-white opacity-80 hover:opacity-100 ml-auto mr-0"
                                to={`/cases/add/${projectId}`}>Add Case</Link>
                        </div>
                        <div className="">
                            <div className=" py-2 px-5 mb-40">
                                {renderSections(data)}
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
                    setData={setData}
                />
            }
        </>
    )
}
export default CasePage;