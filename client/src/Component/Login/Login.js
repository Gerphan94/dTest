import React, { useCallback, useState } from "react";
import { PiEyeLight, PiEyeSlash  } from "react-icons/pi";


function Login() {

    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;


    const [hidePwd, setHidePwd] = useState(true);



    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

        }, []);



    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[90] outline-none focus:outline-none">
                <div className="relative lg:w-1/6 md:w-2/3 w-full my-6 mx-auto max-w-3xl p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none text-[#536493]">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 bg-[#eaf1f7]">
                                <div className="text-xl font-semibold select-none">Login</div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 text-left text-sm">
                                <div>
                                    <div className="py-2">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            User*
                                        </label>
                                        <input
                                            type="text"
                                            name="user"
                                            className="border w-full outline-none px-2 py-1"
                                            required={true}
                                            autoComplete='off'
                                        />
                                    </div>

                                    <div className="py-2">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            Password*
                                        </label>
                                        <div className="relative">
                                        <input
                                            type="password"
                                            name="pwd"
                                            autoComplete="new-password"
                                            className="border w-full outline-none px-2 py-1"
                                            required={true}
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 pr-2  p-1 group-hover:border-blue-200 "
                                            // onClick={toggleDropdown}
                                        >
                                            <PiEyeLight className="h-5 w-5 text-blue-400 hover:text-blue-700 cursor-pointer hover:font-bold" />
                                        </span>

                                        </div>
                                        
                                    </div>
                                </div>

                            </div>
                            {/*footer*/}
                            <div className=" p-2 bg-[#f5f5f5]">
                                <input
                                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                    type="submit"
                                    value="Login"
                                >
                                </input>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <div className="opacity-100 fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900"></div>
        </div>

    )


}

export default Login;