import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SUMMARY_API from "../common";
import { CiCircleCheck } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
function CheckoutResult() {
    const [data, setData] = useState({
        RspCode: "",
        Message: "",
    });
    const location = useLocation();
    const searchParams = location.search;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${SUMMARY_API.vnpay_ipn.url + searchParams}`
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log("error");
            }
        };
        fetchData();
    }, [searchParams]);
    return (
        <div className="container flex items-center justify-center p-10 mx-auto">
            {data.RspCode === "00" ? (
                <div className="text-center bg-white min-h-52 w-[600px] max-w-[100%] flex gap-10 items-center flex-col p-4 pb-20  shadow-md rounded-md">
                    <h1 className="pt-10 text-3xl font-bold text-green-500">
                        Thanh toán thành công
                    </h1>
                    <div className="relative p-4 mt-4">
                        <CiCircleCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-center text-green-500" />
                        <div className="z-10 w-40 h-40 border-8 border-green-400 rounded-full animate-ping "></div>
                    </div>
                    <Link
                        to={"/"}
                        className="p-4 mt-4 text-xl font-bold text-white bg-green-700 rounded hover:bg-green-600"
                    >
                        Back to home
                    </Link>
                </div>
            ) : (
                <div className="text-center bg-white min-h-52 w-[600px] max-w-[100%] flex gap-10 items-center flex-col p-4 pb-20  shadow-md rounded-md">
                    <h1 className="pt-10 text-3xl font-bold text-red-500">
                        Thanh toán thất bại
                    </h1>
                    <div className="relative p-4 mt-4">
                        <ImCancelCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-center text-red-500" />
                        <div className="z-10 w-40 h-40 border-8 border-red-400 rounded-full animate-ping "></div>
                    </div>
                    <Link
                        to={"/"}
                        className="p-4 mt-4 text-xl font-bold text-white bg-red-700 rounded hover:bg-red-600"
                    >
                        Back to home
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CheckoutResult;
