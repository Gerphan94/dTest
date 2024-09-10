import React, { useEffect, useState } from "react";

function CaseSelectTable({ sectionId, cases, handleCaseCheck, handleCaseCheckAll }) {

    console.log('fetch CaseSelectTable')

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [caseView, setcaseView] = useState([])

    console.log('cases', cases)
    useEffect(() => {
        setcaseView(cases);
        setIsCheckAll(false);

    }, [cases])




    const checkAll = () => {
        setIsCheckAll(!isCheckAll)
        setcaseView(cases.map(item => ({ ...item, checked: !isCheckAll })))
        handleCaseCheckAll(sectionId, !isCheckAll)
    }

    const handleClickCheck = (sectionId, caseId) => {
        setcaseView(caseView.map(item => item.id === caseId ? { ...item, checked: !item.checked } : item))
        handleCaseCheck(sectionId, caseId)

    }

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-10 text-center">#</th>
                    <th className="w-10 px-2 text-center">
                        <input type="checkbox"
                            checked={isCheckAll}
                            onChange={checkAll}
                        />
                    </th>
                    <th className="">Case Title</th>
                </tr>
            </thead>
            <tbody>
                {caseView.map((item, index) => (
                    <tr key={index}>
                        <td className="w-10 text-center">{index + 1}</td>
                        <td className="w-10 text-center">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleClickCheck(item.section_id, item.id)}
                            />


                        </td>
                        <td className="px-2 py-0.5">{item.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CaseSelectTable;