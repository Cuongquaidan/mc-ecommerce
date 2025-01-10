import React, { useEffect, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Button, TextField } from "@mui/material";
import Logo from "../components/Logo";
import { FaRegUserCircle } from "react-icons/fa";
import convertToBase64 from "../helpers/convertToBase64";
import SUMMARY_API from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContextGlobal } from "../context";
function MyProfile() {
    const user = useSelector((state) => state?.user?.user);
    const { getUserInfo } = useContextGlobal();
    const [data, setData] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        e.preventDefault();
        console.log(data);

        if (!data.avatar || !data.address || !data.name || !data.phone) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await fetch(SUMMARY_API.updateUserInfo.url, {
                method: SUMMARY_API.updateUserInfo.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const dataResponse = await response.json();
            if (response.ok) {
                toast.success(dataResponse.message);
                getUserInfo();
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setData(user);
    }, [user]);

    return (
        <section id="register" className="mt-5 ">
            {data && (
                <div className="container px-4 pb-4 mx-auto">
                    <div className="relative flex flex-col items-center w-full max-w-md gap-5 mx-auto bg-white rounded-md shadow-sm shadow-slate-500">
                        {isLoading && (
                            <div className="absolute flex items-center justify-center w-full h-full opacity-80 bg-slate-200">
                                <div className="w-20 h-20 border-8 border-white rounded-full border-b-transparent border-t-transparent animate-spin"></div>
                            </div>
                        )}
                        <p className="text-2xl font-bold text-blue-700">
                            MyProfile
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center w-full gap-4 p-4"
                        >
                            <div>
                                <label
                                    htmlFor="avatar"
                                    className="cursor-pointer"
                                >
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

                            <Button
                                variant="contained"
                                className=""
                                disabled={isLoading}
                                type="submit"
                            >
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default MyProfile;
