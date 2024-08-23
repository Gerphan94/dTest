import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

function CaseDetailBox({ title, data }) {




    return (
        <>
            <div name='case-detail-box' className=" mt-5 w-full">
                <div className="p-2 w-full">
                    <div className="flex gap-3 items-center">
                        {title}
                        <span className="w-full h-px border-b border-[#aecade]"></span>
                    </div>
                </div>

                <div className="w-full text-left">
                    <ReactMarkdown
                        children={data}
                    />
                </div>
            </div>
        </>
    )

}

export default CaseDetailBox;