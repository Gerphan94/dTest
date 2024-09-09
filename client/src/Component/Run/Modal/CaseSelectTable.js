import React, { useState } from "react";

function CaseSelectTable({ data, caseViews, setCaseViews, setData, handleCaseCheck }) {

    const [isCheckAll, setIsCheckAll] = useState(false);

    console.log('caseViews', caseViews)

    const onChangeCheck = (id) => {
        
        setData(data.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
        setCaseViews(caseViews.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
    }

    

    const checkAll = () => {
        setIsCheckAll(!isCheckAll)
        setCaseViews(caseViews.map(item => ({ ...item, checked: !isCheckAll })))
    }

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-10 px-2">
                        <input type="checkbox"
                        onChange={checkAll}
                        
                        />
                    </th>
                    <th className="w-full">Case Title</th>
                </tr>
            </thead>
            <tbody>
                {caseViews.map((item, index) => (
                    <tr key={index}>
                        <td className="w-10 px-2">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCaseCheck(item.section_id, item.id)}
                            /></td>
                        <td className="px-2 py-0.5">{item.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CaseSelectTable;