import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

import "moment/locale/vi";
import { useTranslation } from "react-i18next";
function OrderItemAdmin({ order }) {
    const { t } = useTranslation();
    return (
        <Link
            key={order._id}
            className="flex items-center justify-center gap-8 p-4 bg-white rounded-md shadow-md dark:bg-neutral-900 dark:text-slate-300 dark:border border-neutral-600"
            to={`/orders/${order._id}`}
        >
            <div className="flex flex-col flex-1 gap-4">
                <p className="text-lg font-bold">
                    {moment().format("LL").slice(1)}
                </p>
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
                        <p className="italic text-gray-700 dark:text-slate-100">
                            {order.firstDetail.product.productName}
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-blue-700 dark:text-blue-500">
                            {order.firstDetail.sellingPriceAfterPromo.toLocaleString()}{" "}
                            USD
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-300">
                            {t("order.quantity")}: {order.firstDetail.quantity}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center gap-1 p-2 text-white bg-blue-500 border-blue-500 rounded dark:bg-transparent dark:text-blue-500 dark:border ">
                    <p className="text-sm italic text-center">
                        {t("order.shipping-status")}
                    </p>
                    <p className="font-bold ">
                        {order.shippingStatus.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 mt-4 text-white bg-green-500 border-green-500 rounded dark:bg-transparent dark:text-green-500 dark:border">
                    <p className="text-sm italic text-center">
                        {t("order.payment-method")}
                    </p>
                    <p className="font-bold ">
                        {order.paymentMethod.toUpperCase()}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default OrderItemAdmin;
