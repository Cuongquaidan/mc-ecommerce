import React from "react";
import { Link } from "react-router-dom";

const promotionTypes = [
    {
        id: 1,
        name: "All Products",
        description: "Applies to all products in the store.",
        status: "active",
        link: "/admin-panel/all-promotions/all-products",
        color: "text-blue-500",
    },
    {
        id: 2,
        name: "Specific Products",
        description: "Applies to selected products only.",
        status: "active",
        link: "/admin-panel/all-promotions/specific-products",
        color: "text-green-500",
    },
    {
        id: 3,
        name: "Specific Categories",
        description: "Applies to selected categories of products.",
        status: "active",
        link: "/admin-panel/all-promotions/specific-categories",
        color: "text-yellow-500",
    },
    {
        id: 4,
        name: "Specific Users",
        description: "Available for specific users or groups.",
        status: "disabled",
        link: "/admin-panel/all-promotions/specific-users",
        color: "text-red-500",
    },
    {
        id: 5,
        name: "Specific Brands",
        description: "Applies to selected brands only.",
        status: "active",
        link: "/admin-panel/all-promotions/specific-brands",
        color: "text-purple-500",
    },
];

function AllPromotions() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Promotion Management
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {promotionTypes.map((type) => (
                    <Link
                        key={type.id}
                        className={`group relative border rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
                            type.status === "active"
                                ? "bg-white border-gray-200 hover:border-blue-500"
                                : "bg-gray-100 border-gray-300"
                        }`}
                        to={type.status === "active" ? type.link : "#"}
                    >
                        <div className="flex flex-col items-center p-6 min-h-[10rem]">
                            <h3
                                className={`text-2xl font-semibold ${type.color} group-hover:underline text-center`}
                            >
                                {type.name}
                            </h3>
                            <p className="mt-2 text-sm text-center text-gray-600">
                                {type.description}
                            </p>
                        </div>
                        <span
                            className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-tr-lg ${
                                type.status === "active"
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                            }`}
                        >
                            {type.status}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AllPromotions;
