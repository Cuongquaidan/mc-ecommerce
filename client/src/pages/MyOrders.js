import React, { useState } from "react";
import { ImPointDown } from "react-icons/im";
function MyOrders() {
    const ordersLoading = new Array(15).fill(0);
    const [showScrollDownIcon, setShowScrollDownIcon] = useState(false);
    const handleMouseEnter = () => {
        setShowScrollDownIcon(true);
    };
    const handleMouseLeave = () => {
        setShowScrollDownIcon(false);
    };
    return (
        <div
            className="container min-h-[calc(100vh-300px)] mx-auto p-4 mt-4 cursor-pointer relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showScrollDownIcon && (
                <div className="absolute top-[50%] w-20 justify-center h-20 -translate-y-1/2 flex flex-col items-center border-green-600 rounded-full border-2 p-2  right-[-80px] shadow-md ">
                    <ImPointDown size={30} className="text-green-700" />
                    <p className="text-sm italic font-bold">Scroll </p>
                </div>
            )}
            <h2 className="text-2xl italic font-bold">List orders</h2>
            <div className="flex flex-col gap-16 mt-8 max-h-[calc(100vh-400px)] overflow-y-scroll scrollbar-hide">
                {ordersLoading.map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-center flex-shrink-0 gap-4 p-8 bg-white rounded-md shadow-md h-52"
                    >
                        <div className="h-4 rounded-md w-[30%] bg-slate-300 animate-pulse"></div>
                        <div className="h-4 rounded-md w-[50%] bg-slate-300 animate-pulse"></div>
                        <div className="h-4 rounded-md w-[70%] bg-slate-300 animate-pulse"></div>
                        <div className="h-4 rounded-md w-[70%] bg-slate-300 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
