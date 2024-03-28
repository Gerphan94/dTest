import React, { useState, useEffect, useCallback } from "react";


function CaseDetailBox( {title, detail} ) {


    return (

        <>
            <div className="flex mt-5">
                <span className="pr-4 text-left">{title}</span>
                <div className="block border-b w-full h-[1px] border-black mt-4"></div>




            </div>
        </>
    )

}

export default CaseDetailBox;