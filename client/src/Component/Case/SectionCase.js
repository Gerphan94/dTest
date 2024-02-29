import React from "react";



function SectionCase(props) {

    return (

        <div>
            <div>{props.data.section_name}</div>
            <div className="w-full">
                <table className="w-full">
                    <th>#</th>
                    <th>Title</th>
                    <th>#</th>
                    <th>#</th>


                </table>

            </div>

        </div>



    )



}
export default SectionCase;