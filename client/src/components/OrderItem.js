import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
function OrderItem({ order, SetShowConMeo }) {
    return (
        <Link
            key={order._id}
            className="flex items-center justify-center gap-8 p-4 bg-white rounded-md shadow-md "
            to={`/orders/${order._id}`}
            onMouseEnter={() => SetShowConMeo(true)}
            onMouseLeave={() => SetShowConMeo(false)}
        >
            <div className="flex flex-col flex-1 gap-4">
                <p className="text-lg font-bold">{moment().format("LL")}</p>
                <p className="text-2xl font-bold text-green-700">
                    {order.total.toLocaleString()} VND
                </p>
                <div className="w-[100%] bg-slate-500 bg-opacity-10 items-center  p-4 rounded-md flex justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={order.firstDetail.product.productImages[0]}
                            alt="MCSHOP"
                            className="object-cover w-16 h-16 rounded-md"
                        />
                        <p className="italic text-gray-700">
                            {order.firstDetail.product.productName}
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-blue-700">
                            {order.firstDetail.sellingPriceAfterPromo.toLocaleString()}{" "}
                            USD
                        </p>
                        <p className="text-sm text-gray-500">
                            Quantity: {order.firstDetail.quantity}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center gap-1 p-2 text-white bg-blue-500 rounded ">
                    <p className="text-sm italic text-center">
                        Shipping Status
                    </p>
                    <p className="font-bold ">
                        {order.shippingStatus.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 mt-4 text-white bg-green-500 rounded">
                    <p className="text-sm italic text-center">Payment Method</p>
                    <p className="font-bold ">
                        {order.paymentMethod.toUpperCase()}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default OrderItem;
