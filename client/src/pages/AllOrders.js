import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SUMMARY_API from "../common";
import OrderItemAdmin from "../components/OrderItemAdmin";
import { useLocation, useNavigate } from "react-router-dom";

function AllOrders() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const handleNextPage = () => {
        if (page < numOfPages) {
            setPage(page + 1);
            navigate(`/admin-panel/all-orders?page=${page + 1}&limit=${limit}`);
        }
    };
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            navigate(`/admin-panel/all-orders?page=${page - 1}&limit=${limit}`);
        }
    };
    useEffect(() => {
        const queryPage = parseInt(params.get("page"), 10);
        const queryLimit = parseInt(params.get("limit"), 10);
        if (queryPage) {
            setPage(queryPage);
        }
        if (queryLimit) {
            setLimit(queryLimit);
        }
    }, [location.search, params]);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${SUMMARY_API.getOrdersByAdmin.url}?page=${page}&limit=${limit}`,
                    {
                        credentials: "include",
                    }
                );
                const result = await response.json();
                console.log(result);
                if (result.success) {
                    setOrders(result.data.orders);
                    setTotal(result.data.total);
                    setNumOfPages(result.data.numOfPages);
                    setLoading(false);
                }
                if (result.error) {
                    toast.error(result.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page, limit]);

    return (
        <div className="container flex flex-col p-4 min-h-[500px] ">
            <div className="flex-1 min-h-[500px] max-h-[750px] overflow-y-auto">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="flex flex-col gap-8 ">
                        {orders.map((order) => (
                            <OrderItemAdmin order={order}></OrderItemAdmin>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center gap-4 py-4 mt-auto border-t border-gray-200">
                <button
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <p className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-md shadow">
                    {page}
                </p>
                <button
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllOrders;
