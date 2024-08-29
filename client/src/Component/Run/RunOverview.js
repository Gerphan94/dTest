import React from "react";
import styles from "../styles.module.css";
import { LinkNew } from "../Common/CustomButton";
function RunOverview() {
    return (
        <div className={styles.bodyPage}>
            <div className="flex h-full">
                <div className="w-full h-full bg-[#EAF1F7]">
                    <div className="flex p-2 border-b-[1px] border-[#aecade] font-medium">
                        Test Runs & Results
                    </div>
                    <div className="p-4 flex">
                        <div className="text-left border-b-4 border-[#aecade] pb-1">
                            <h1 className="font-bold">Open</h1>
                        </div>

                    </div>
                    {/* COMPLELE */}
                    <div className="p-4 flex">
                        <div className="text-left border-b-4 border-[#aecade] pb-1">
                            <h1 className="font-bold">Completed</h1>
                        </div>

                    </div>
                </div>
                <div className="w-80">
                    <div className="mt-4">

                        <LinkNew name="Add Test Run" href={"/run/create"} />
                    </div>

                </div>

            </div>
        </div>

    );
}


export default RunOverview;