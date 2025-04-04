import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import Logo from "../components/Logo";
import { FaRegUserCircle } from "react-icons/fa";
import convertToBase64 from "../helpers/convertToBase64";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        avatar: "",
        phone: "",
        address: "",
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        if (data.password !== data.confirmPassword) {
            toast.error("Password and Confirm Password must be same");
            return;
        }
        if (!data.avatar || !data.email || !data.password || !data.name) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await fetch(SUMMARY_API.register.url, {
                method: SUMMARY_API.register.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                toast.error("Something went wrong");
            }
            const result = await response.json();
            console.log(result);
            if (result.success) {
                toast.success(result.message);
                navigate("/login");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section id="register" className="mt-5 ">
            <div className="container px-4 pb-4 mx-auto">
                <div className="flex flex-col items-center w-full max-w-md gap-5 p-4 mx-auto bg-white rounded-md shadow-sm shadow-slate-500">
                    <p className="text-2xl font-bold text-blue-700">Register</p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full gap-4 p-4"
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
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                placeholder="Enter your phone"
                                id="phone"
                                name="phone"
                                className="w-full p-3 outline-none bg-slate-100"
                                onChange={handleChange}
                                value={data.phone}
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                id="address"
                                name="address"
                                className="w-full p-3 outline-none bg-slate-100"
                                onChange={handleChange}
                                value={data.address}
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
