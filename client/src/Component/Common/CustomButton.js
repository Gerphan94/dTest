import { Link } from "react-router-dom";
import React  from "react";
import { IoCloseSharp, IoCheckmark  } from "react-icons/io5";

export const LinkNew = ( { href, name }) => {
    return (
        <Link
            className="flex gap-3 items-center bg-transparent border border-red-600 opacity-65 hover:opacity-100  text-red-600 font-bold py-1 pl-4 pr-6  focus:shadow-outline"
            to={href}
        >
           {name}
        </Link>
    );
};

export const BtnCancel = ( {onClick }) => {
    return (
        <button
            className="flex gap-3 items-center bg-transparent border border-red-600 opacity-65 hover:opacity-100  text-red-600 font-bold py-1 pl-4 pr-6  focus:shadow-outline"
            type="button"
            onClick={onClick}
        >
            <IoCloseSharp />
            Cancel
        </button>
    );
};


export const BtnOK = ( {onClik,  name='Save' } ) => {
    return (
        <button
            className="flex gap-2 items-center bg-[#049474] border border-[#049474]  text-white font-bold py-1 pl-4 pr-6 focus:shadow-outline"
            type="submit"
            onClik={onClik}
            
        >
            <IoCheckmark  />
            {name}
        </button>
    );
};

export const BtnOKDisabled = ( {  name='Save' } ) => {
    return (
        <button
            className="flex gap-3 items-center bg-white border border-[#979797]  text-[#979797] font-bold py-1 pl-4 pr-6 focus:outline-none focus:shadow-outline cursor-not-allowed"
            type="button"
            
        >
            <IoCheckmark />
            {name}
        </button>
    );
};