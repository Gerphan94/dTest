import React from "react";
import CaseForm from "./CaseForm";
import styles from "../styles.module.css"
import { useParams } from "react-router-dom";

function CaseAdd(props) {

    const { projectId } = useParams();

    return (

        <>
            <div className={styles.bodyPage}>
                <div className="flex overflow-y-auto h-screen">
                    <div className="w-full">
                    <div className="text-left border-b px-4 py-2 font-medium">Add Test Case</div>
                    <div>
                        <CaseForm projectId={projectId} />
                    </div>
                    </div>
                    <div className="w-64 h-full bg-slate-300">

                    </div>
                    
                </div>


            </div>



        </>
    );
}
export default CaseAdd;