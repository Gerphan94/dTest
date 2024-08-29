import React from "react";
import { FaCheck, FaXmark, FaRegCopy } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { FaRegClone } from "react-icons/fa6";

export const IconBtnEdit = ({ onClick }) => {
    return (
        <button
            className="ml-1 text-blue-500"
            type="button"
            onClick={onClick}
        >
            <CiEdit />
        </button>
    )
}


export const IconBtnCopy = ({ onClick }) => {
    return (
        <div className="relative flex items-center justify-center">
            <button
                className="ml-1 text-blue-500"
                type="button"
                onClick={onClick}
            >
                <FaRegClone />
            </button>
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-max text-center bg-gray-700 text-white text-xs rounded py-2 px-3">
                Tooltip text
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-3 h-3 bg-gray-700 rotate-45"></div>
            </div>
        </div>


    )
}


