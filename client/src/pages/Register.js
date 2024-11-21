import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import Logo from "../components/Logo";
import { FaRegUserCircle } from "react-icons/fa";
import convertToBase64 from "../helpers/convertToBase64";

function Register() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        avatar: "",
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const imaBase64 = await convertToBase64(file);
        setData({
            ...data,
            avatar: imaBase64,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };
    return (
        <section id="register" className="mt-5 ">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center w-full max-w-md gap-5 p-4 mx-auto bg-white rounded-md shadow-sm shadow-slate-500">
                    <p className="text-2xl font-bold text-blue-700">Register</p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full gap-10 p-4"
                    >
                        <div>
                            <label htmlFor="avatar" className="cursor-pointer">
                                {data.avatar ? (
                                    <img
                                        src={data.avatar}
                                        alt="avatar"
                                        className="object-cover w-24 h-24 rounded-full"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <FaRegUserCircle className="w-20 h-20" />
                                        <p className="italic text-gray-600">
                                            Upload your image
                                        </p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    className="hidden"
                                    onChange={handleUploadImage}
                                />
                            </label>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                id="name"
                                name="name"
                                className="w-full p-3 outline-none bg-slate-100"
                                onChange={handleChange}
                                value={data.name}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                id="email"
                                name="email"
                                className="w-full p-3 outline-none bg-slate-100"
                                onChange={handleChange}
                                value={data.email}
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
                                    onChange={handleChange}
                                    value={data.password}
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
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative w-full">
                                <input
                                    type={
                                        isShowConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Enter your confirm password"
                                    className="w-full p-3 outline-none bg-slate-100"
                                    onChange={handleChange}
                                    value={data.confirmPassword}
                                />
                                <div
                                    className="absolute -translate-y-1/2 right-5 top-1/2"
                                    onClick={() =>
                                        setIsShowConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {isShowConfirmPassword ? (
                                        <IoIosEyeOff></IoIosEyeOff>
                                    ) : (
                                        <IoIosEye></IoIosEye>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button variant="contained" className="" type="submit">
                            Register
                        </Button>
                    </form>
                    <div>
                        <p>
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-red-500 hover:underline"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
