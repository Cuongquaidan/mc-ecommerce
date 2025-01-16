import React, { useEffect, useState } from "react";
import { ImPointDown } from "react-icons/im";
import { Link } from "react-router-dom";
import SUMMARY_API from "../common";
import OrderItem from "./OrderItem";

import ConMeo from "../assest/conmeochidan.png";
import moment from "moment";
import "moment/locale/vi";
function MyOrders() {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowConMeo, setIsShowConMeo] = useState(false);
    const ordersLoading = new Array(15).fill(0);
    const [orders, setOrders] = useState([]);
    const [showScrollDownIcon, setShowScrollDownIcon] = useState(false);
    const handleMouseEnter = () => {
        setShowScrollDownIcon(true);
    };
    const handleMouseLeave = () => {
        setShowScrollDownIcon(false);
    };
    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(SUMMARY_API.getOrders.url, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Fetch orders failed");
                }
                const data = await response.json();
                if (data.success) {
                    setOrders(data.data);
                    console.log(data.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
        moment.locale("vi");
    }, []);
    return (
        <div
            className="container min-h-[calc(100vh-300px)] mx-auto p-4 mt-4 cursor-pointer relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={ConMeo}
                alt="MCSHOP"
                className={`w-[200px] h-[200px] fixed top-[50%] duration-500 ease-in -translate-y-1/2 left-10 ${
                    !isShowConMeo
                        ? "-translate-x-full opacity-0"
                        : "-translate-x-0 opacity-1"
                }`}
            />
            {showScrollDownIcon && (
                <div className="absolute top-[50%] w-20 justify-center h-20 -translate-y-1/2 flex flex-col items-center border-green-600 rounded-full border-2 p-2  right-[-80px] shadow-md ">
                    <ImPointDown size={30} className="text-green-700" />
                    <p className="text-sm italic font-bold">Scroll </p>
                </div>
            )}
            <h2 className="text-2xl italic font-bold">List orders</h2>
            <div className="flex flex-col gap-16 mt-8 max-h-[calc(100vh-400px)] overflow-y-scroll scrollbar-hide">
                {isLoading
                    ? ordersLoading.map((_, index) => (
                          <div
                              key={index}
                              className="flex flex-col justify-center flex-shrink-0 gap-4 p-8 bg-white rounded-md shadow-md h-52"
                          >
                              <div className="h-4 rounded-md w-[30%] bg-slate-300 animate-pulse"></div>
                              <div className="h-4 rounded-md w-[50%] bg-slate-300 animate-pulse"></div>
                              <div className="h-4 rounded-md w-[70%] bg-slate-300 animate-pulse"></div>
                              <div className="h-4 rounded-md w-[70%] bg-slate-300 animate-pulse"></div>
                          </div>
                      ))
                    : orders?.map((order) => (
                          <OrderItem
                              order={order}
                              SetShowConMeo={setIsShowConMeo}
                          />
                      ))}
            </div>
        </div>
    );
}

export default MyOrders;
