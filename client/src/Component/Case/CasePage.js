import React, { useState, useEffect} from "react";
import SideBar from "./SideBar";
import Select from 'react-select'
import SectionCase from "./SectionCase";
import styles from "../styles.module.css"


function CasePage() {

    const urlAPI = "http://127.0.0.1:5000/api/";

    const [projectId, setProjectId] = useState(1);
    const [curModule, setCurModule] = useState(null);
    const [caseData, setCaseData] = useState([]);
    
    const [modulesOptions, setModulesOptions] = useState([]);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                console.log(projectId)
                const response = await fetch(urlAPI + "modules/" + projectId);
                const data = await response.json();
                const modules = []
                data.forEach(element => {
                    modules.push({value: element.id, label: element.name})
                });
                setModulesOptions(modules)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchModule();
    }, [projectId])

    


    const handleChangeModule = (selectedOption) => {
        // Handle the selected option here
        const selectedModule = selectedOption.value;
        setCurModule(selectedOption.value);
        const fetchCase = async () => {
            try {
                console.log(projectId)
                const response = await fetch(urlAPI + "cases_by_module/" + selectedModule);
                const data = await response.json();
                setCaseData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCase();
       

      };


    return (
        <div className="flex bg-slate-50">
            <SideBar />
            <div className={styles.MainPage}>
              
                <div className="flex gap-4 p-4">
                    <div className="flex flex-wrap content-center">Module</div>
                    <Select 
                    className="text-left w-56" 
                    options={modulesOptions}
                    onChange={handleChangeModule}
                    />
                </div>
                <div>
                {caseData.map((data)  => 
                    <SectionCase  data={data} />
                
                )}
                </div>

                

                
            
            </div>
           
        </div>
    )
}
export default CasePage;