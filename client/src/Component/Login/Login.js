import React, { useCallback, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

function Login({ setCookie, setLoggedIn }) {


    const urlAPI = process.env.REACT_APP_API_URL;
    const urlWEB = process.env.REACT_APP_WEB_URL;

    const [hidePwd, setHidePwd] = useState(true);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            try {
                const response = await fetch(urlAPI + "login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formJson),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('-------', data);
                    setCookie('token', data.token, { path: '/', expires: new Date(Date.now() + 86400 * 1000)});

                    // setCookie('token', data.token, { path: '/' });
                    setLoggedIn(true);

                } else {
                    const data = await response.json();
                    alert(data.message);
                }

            } catch (error) {
                console.error("Error:", error);
            }
        }, []);

    return (

        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[90] outline-none focus:outline-none">
                <div className="relative w-[300px] my-6 mx-auto max-w-3xl p-4">
                    <form method="post" onSubmit={(e) => handleSubmit(e)} autoComplete='none'>
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none text-[#536493]">
                            {/*header*/}
                            <div className="text-xl mt-4 text-center font-semibold select-none">Welcome</div>
                            {/*body*/}
                            <div className="relative px-6 py-2 text-left text-sm">
                                <div>
                                    <div className="py-2">
                                        <label htmlFor="section_name" className="block font-bold py-1">
                                            User*
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
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
                                                type={`${hidePwd ? "password" : "text`"}`}
                                                name="password"
                                                autoComplete="new-password"
                                                className="border w-full outline-none px-2 py-1"
                                                required={true}
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 pr-2  p-1 group-hover:border-blue-200 "
                                                onClick={() => setHidePwd(!hidePwd)}
                                            >
                                                <PiEyeLight className="h-5 w-5 text-blue-400 hover:text-blue-700 cursor-pointer hover:font-bold" />
                                            </span>

                                        </div>

                                    </div>
                                    <div className="py-2">
                                        <input
                                            className="bg-blue-500 w-full rounded-md text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 shadow opacity-80 hover:opacity-100 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                                            autoComplete="off"
                                            spellCheck="false"
                                            type="submit"
                                            value="Login"
                                        >
                                        </input>
                                    </div>
                                    <div>
                                    </div>
                                    <div className="py-4">
                                        <div className="w-full text-center text-xs hover:underline cursor-pointer py-0.5">Forgot password</div>
                                        <div className="w-full text-center hover:underline cursor-pointer py-0.5">Create new account</div>
                                    </div>
                                </div>

                            </div>
                            {/*footer*/}

                        </div>
                    </form>


                </div>
            </div>
            <div className="opacity-100 fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900"></div>
        </div>

    )


}

export default Login;