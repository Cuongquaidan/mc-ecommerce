import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import SUMMARY_API from "../common";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../context";
import { useDispatch } from "react-redux";

function Login() {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { getUserInfo, fetchGetCart, fetchPromotionDetails } =
        useContextGlobal();
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        if (!data.email || !data.password) {
            toast.error("All fields are required");
            return;
        }
        try {
            const response = await fetch(SUMMARY_API.login.url, {
                method: SUMMARY_API.login.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                navigate("/");
                getUserInfo();
                fetchGetCart();
                fetchPromotionDetails();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <section id="login" className="mt-5 ">
            <div className="container px-4 mx-auto ">
                <div className="flex flex-col items-center w-full max-w-md gap-5 p-4 mx-auto bg-white rounded-md shadow-sm shadow-slate-500">
                    <div className="flex items-center gap-4 p-4">
                        <Logo></Logo>
                        <p className="text-2xl font-bold">Welcome back!!!</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">Login</p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full gap-10 p-4"
                    >
                        <div className="flex flex-col gap-2">
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
                        <div className="ml-auto">
                            <a
                                href="/forgot-password"
                                className="text-blue-500 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button variant="contained" className="" type="submit">
                            Login
                        </Button>
                    </form>
                    <div>
                        <p>
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-red-500 hover:underline"
                            >
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
