import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Button, TextField } from "@mui/material";

function Login() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <section id="login" className="mt-5">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center w-full max-w-md gap-5 p-2 mx-auto bg-white rounded-md">
                    <p className="text-2xl font-bold">Welcome back!!!</p>
                    <p className="text-2xl font-bold">Login</p>
                    <form action="" className="flex flex-col w-full gap-10 p-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                className="w-full p-3 outline-none bg-slate-100"
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="password">Password</label>
                            <div className="relative w-full">
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full p-3 outline-none bg-slate-100"
                                />
                                <div
                                    className="absolute -translate-y-1/2 right-5 top-1/2"
                                    onClick={() =>
                                        setIsShowPassword((prev) => !prev)
                                    }
                                >
                                    {isShowPassword ? (
                                        <IoIosEyeOff></IoIosEyeOff>
                                    ) : (
                                        <IoIosEye></IoIosEye>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <a
                                href="/forgot-password"
                                className="text-blue-500 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button variant="contained" className="">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
