import React from "react";
import styles from "../styles.module.css"
import Select from 'react-select'

function CaseForm() {

    const action = "Add";

    return (
        <div className="flex">

            <div className={styles.MainPage}>
                <div className="text-left border-b-2 p-2">
                    {action === 'Add' ? "Add Testcase" : " Edit Testcase "}
                </div>
                <div className="p-4">
                    <form>
                        <div className="text-left mb-4">
                            <label htmlFor="case_title" className="block">
                                Title*
                            </label>
                            <input
                                name="case_title"
                                type="text"
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                                required={true} />
                        </div>

                        <div className="border border-[#d2e2ed] grid grid-cols-4 gap-4 p-4">
                            <div className="text-left">
                                <label htmlFor="section" className="block">
                                    Section*
                                </label>
                                <Select className="" />

                            </div>
                            <div className="text-left">
                                <label htmlFor="section" className="block">
                                    Type*
                                </label>
                                <Select />

                            </div>

                        </div>
                        {/* Precondition */}
                        <div className="text-left mt-5">
                            <label htmlFor="precondition" className="block">Precondition</label>
                            <textarea
                                name="precondition"
                                type="text"
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                                required={true} />
                            <p className="text-gray-400">The preconditions of this test case. Reference other test cases with [C#] (e.g. [C17]).
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="text-left mt-5">
                            <label htmlFor="steps" className="block">Steps</label>
                            <textarea
                                name="steps"
                                type="text"
                                className="border border-[#d2e2ed] rounded-sm outline-none w-full px-2"
                                required={true} />
                            <p className="text-gray-400">The required steps to execute the test case.</p>
                        </div>



                    </form>


                </div>



            </div>
            <div className="bg-[#d2e2ed] w-48 h-screen text-white"></div>



        </div>
    )


}

export default CaseForm;