import React from "react";



function WorkRun({ data, setShowWTModal }) {
    return (
        <>
            <div className="w-full">
                <div className="text-left pb-2 font-bold">TASK</div>
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
                {data.length === 0 && <div className="w-full border py-0.5 text-gray-400">Không có dữ liệu</div>}
                <div className="text-left">
                <button
                    className="hover:underline text-blue-400"
                    onClick={() => setShowWTModal(true)}
                >Thêm task</button>
                </div>
               

                {/* <div className="flex w-full">
                    <div>{data.task_id}</div>
                    <div>{data.task_name}</div>
                    <div>{data.status}</div>
                </div> */}

            </div>



        </>
    )
}

export default WorkRun;