import React from "react";



function WorkRun( {data}) {
    return (
        <>
        <div>Task</div>
        <div className="flex w-full">
            <div>{data.task_id}</div>
            <div>{data.task_name}</div>
            <div>{data.status}</div>
        </div>

        </>
    )
}

export default WorkRun;