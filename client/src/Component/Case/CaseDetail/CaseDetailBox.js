import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function CaseDetailBox( {title, data} ) {


    return (

        <>
            <div name='case-detail-box' className="flex mt-5">
                <span className="pr-4 text-left">{title}</span>
                
                <div className="block border-b w-full h-[1px] border-black mt-4">
                   
                </div>
                <div>
                <ReactMarkdown  children={data} remarkPlugins={[remarkGfm]} />
                </div>
            </div>
        </>
    )

}

export default CaseDetailBox;