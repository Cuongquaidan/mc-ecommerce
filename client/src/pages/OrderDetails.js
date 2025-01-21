import React, { useEffect, useState } from "react";
import SUMMARY_API from "../common";
import { Link, useLocation } from "react-router-dom";

function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(
                    SUMMARY_API.getOrdersByOrderId.url +
                        "/" +
                        location.pathname.split("/")[2],
                    {
                        credentials: "include",
                    }
                );
                const dataResponse = await response.json();
                if (!response.ok) {
                    console.log(dataResponse.message);
                }
                setOrderDetails(dataResponse.data);
                console.log(dataResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrderDetails();
    }, []);
    return (
        <div className="container gap-4 mx-auto mt-8">
            <Link
                to={"/my-orders"}
                className="flex items-center gap-2 italic font-medium text-blue-600 "
            >
                {"<<"} <p className="underline">My orders</p>
            </Link>
            {orderDetails.map((orderDetail) => (
                <div
                    className="border-b-2 border-gray-300"
                    key={orderDetail._id}
                >
                    <div className="relative flex items-center justify-between p-4 overflow-hidden border-b">
                        <div className="flex items-center gap-4">
                            <img
                                src={orderDetail.product.productImages[0]}
                                alt={orderDetail.product.productName}
                                className="object-cover w-16 h-16 rounded"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-bold text-black uppercase">
                                    {orderDetail.product.productName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {orderDetail.product.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-right">
                            <span className="italic text-gray">
                                Quantity: {orderDetail.quantity}
                            </span>
                            <div>
                                {orderDetail.sellingPriceAfterPromo !==
                                orderDetail.selling ? (
                                    <div className="">
                                        <span className="line-through text-slate-500">
                                            {orderDetail.selling.toLocaleString()}
                                            $
                                        </span>
                                        <span className="font-bold text-green-600">
                                            {orderDetail.sellingPriceAfterPromo.toLocaleString()}
                                            $
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bold text-green-600">
                                        {orderDetail.sellingPriceAfterPromo.toLocaleString()}
                                        $
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderDetails;
