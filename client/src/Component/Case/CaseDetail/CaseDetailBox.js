import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from "remark-breaks";

import './markdown.css'
// import remarkGfm from 'https://esm.sh/remark-gfm@4'

function CaseDetailBox({ title, data }) {


    console.log(data)

    return (
        <>

            <div name='case-detail-box' className=" mt-5 w-full">
                <div className="p-2 w-full">
                    <div className="flex gap-3 items-center font-medium">
                        {title}
                        <span className="w-full h-px border-b border-[#aecade]"></span>
                    </div>
                </div>

                <div name="case-detail" className="w-full text-left px-4 text-sm">
                <ReactMarkdown
                    children={data}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                />
                
                
                </div>
            </div>
        </>
    )

}

export default CaseDetailBox;