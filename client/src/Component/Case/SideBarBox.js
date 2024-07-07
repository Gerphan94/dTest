import React from "react";

function SideBarBox( {data}) {
    return (
        <>
        {data.map((item) => (

            <div>{item.name}</div>
        ))}
        </>


    )
}

export default SideBarBox;

