import React, { useState, useEffect, useCallback, useContext, useRef, createRef } from "react";
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalVariables } from "../../Store/AppContext";
import SideBar from "./SideBar";
import SectionModal from "./SectionModal";
import { GoTag } from "react-icons/go";
import TagModal from "./Modal/TagModal";
import Toggle from "../Common/ToggleSwitch";
import RmTaskModal from "./Modal/RmTaskModal";
import { useCase } from "../../Store/CaseContext";
import Navbar from "../navBar";

function CasePage() {

    console.log("fetching CasePage")

    const navigate = useNavigate();


    const { projectId } = useParams();
    const { setGlobalProjectId, logginUser, setSelectedNavBar } = useGlobalVariables();

    const urlAPI = process.env.REACT_APP_API_URL;

    const [data, setData] = useState([]);
    const [sideData, setSideData] = useState([]);
    const [showTagModal, setShowTagModal] = useState(false);
    const [showDeleted, setShowDeleted] = useState(false);

    const [expCaseModal, setExpCaseModal] = useState({
        show: false,
        caseId: null,
        exp: ''
    });

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
        }
        return result
    }

    useEffect(() => {
        if (isNaN(projectId)) {
            navigate('/', { state: { eMessage: 'Field Test Suite is not a valid ID.' } });
            return;
        }
        const getProjectDetail = async () => {
            try {
                const response = await fetch(urlAPI + "api/get-project-by-id/" + projectId);
                const statusCode = response.status;
                if (statusCode !== 200) {
                    navigate('/', { state: { eMessage: 'Field Test Suite is not a valid ID.' } });
                    return;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getProjectDetail();
        setGlobalProjectId(projectId);
    }, [projectId])


    const fetchCase = async () => {
        try {
            const fetchUrl = urlAPI + "api/get-cases-by-project/" + projectId;
            const response = await fetch(fetchUrl);
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
            setSideData(get_side_data(responseData))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchCase();
        setSelectedNavBar('cases');
        // setProjectId(projectId)
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
                    <div className="border-l-[1px] border-[#aecade] pl-5">
                        {renderSections(section.sub)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex  mt-20">
                    <div className="w-full px-3 bg-[#EAF1F7]">
                        <div className="flex p-2 border-b-2 font-medium">
                            Test Cases
                        </div>

                        <div className="w-full border-t-[1px] my-4 border-b-[1px] border-[#aecade] flex gap-2 justify-end bg-white text-sm sticky top-20 z-40">
                            <Toggle idname='showDeleted' enabled={showDeleted} setEnabled={setShowDeleted} displayName="Display deleted Test Case" />
                            <button
                                onClick={() => setShowTagModal(true)}
                                className="px-4 py-0.5 flex items-center font-normal gap-2 border-r-[1px] border-[#aecade] bg-transparent hover:bg-[#dff4ff]">
                                <GoTag className="text-[#aecade]" />
                                Tag
                            </button>
                        </div>

                        <div className="">
                            <div className="py-2 px-5 mb-40 h-full">
                                {renderSections(data)}
                                <div className="text-left">
                                    <button
                                        className="text-[#5993bc] underline select-none"
                                        onClick={() => onClickAddSection()}
                                    >
                                        Add Section
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SideBar projectId={projectId} sideData={sideData} handleScroll={handleScroll} />
                </div>
            </div>

            {sectionModal['show'] &&
                <SectionModal
                    sectionModal={sectionModal}
                    setSectionModal={setSectionModal}
                    projectId={projectId}
                />
            }
            {showTagModal &&

                <TagModal setShowModal={setShowTagModal} />
            }



        </>
    )
}
export default CasePage;