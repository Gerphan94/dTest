import React from "react";



function WorkTask({ data }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="w-10">STT</th>
                        <th className="w-20">ID</th>
                        <th className="text-center">Tiêu đề</th>
                        <th className="w-20">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.task_id}</td>
                            <td className="text-left">{item.task_name}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <div className="flex w-full">
                <div>{data.task_id}</div>
                <div>{data.task_name}</div>
                <div>{data.status}</div>
            </div>

        </>
    )
}

export default WorkTask;