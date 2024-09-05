import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { LinkNew } from "../Common/CustomButton";
import moment from "moment";
import { Link, useParams } from "react-router-dom";


import { FcDataSheet } from "react-icons/fc";

function RunOverview() {

    const { projectId } = useParams();
    const urlAPI = process.env.REACT_APP_API_URL;

    const [runs, setRuns] = useState([]);

    useEffect(() => {
        const fetchRuns = async () => {

            try {
                const fetchURL = urlAPI + "api/get-runs/" + projectId;
                const response = await fetch(fetchURL);
                const data = await response.json();
                setRuns(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRuns();

    }, [projectId])



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
                    <div className="p-4">
                        {runs.map((run) => (
                            <div className="bg-white p-4 mb-4 flex">
                                <div className="size-20">
                                    <FcDataSheet className="size-full" />
                                </div>
                                <div className="px-4 text-left">
                                    <Link
                                        to={"/runs/view/" + run.id}
                                        className="text-left font-medium hover:underline" >
                                        {run.name}
                                    </Link>
                                    <div className="flex gap-1">
                                        <span className="text-[#6e6e6e]">By {run.created_by} on {moment.utc(run.created_date).format("DD/MM/YYYY HH:mm")}</span>
                                        <span>|</span>
                                        <p className="text-[#5993bc] underline cursor-pointer">Edit</p>
                                    </div>
                                    <div className="text-[#6e6e6e]">
                                        139 Passed, 6 Blocked, 83 Untested, 10 Retest and 4 Failed

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    {/* COMPLELE */}
                    <div className="p-4 flex">
                        <div className="text-left border-b-4 border-[#aecade] pb-1">
                            <h1 className="font-bold">Completed</h1>
                        </div>

                    </div>
                </div>
                <div className="w-80 bg-[#D2E2ED]">
                    <div className="p-4">
                        <div className="py-1 w-3/4">
                            <LinkNew name="Add Test Run" href={"/runs/add/" + projectId} />

                        </div>
                        <div className="py-1 w-3/4">
                            <LinkNew name="Add Test Plan" href={"/runs/add/" + projectId} />

                        </div>
                    </div>



                </div>

            </div>
        </div>

    );
}


export default RunOverview;