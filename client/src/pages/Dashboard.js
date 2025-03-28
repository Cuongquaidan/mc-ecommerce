import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import SUMMARY_API from "../common";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useTranslation } from "react-i18next";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
function Dashboard() {
    const [type, setType] = useState("Quantity");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Đồng bộ trạng thái từ URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryMonth = parseInt(params.get("month"), 10);
        const queryYear = parseInt(params.get("year"), 10);

        // Chỉ cập nhật state nếu khác với giá trị hiện tại
        if (
            (!isNaN(queryMonth) &&
                queryMonth !== month &&
                queryMonth >= 1 &&
                queryMonth <= 12) ||
            (!isNaN(queryYear) &&
                queryYear !== year &&
                queryYear >= 1900 &&
                queryYear <= 2100)
        ) {
            if (queryMonth >= 1 && queryMonth <= 12) {
                setMonth(queryMonth);
            }
            if (queryYear >= 1900 && queryYear <= 2100) {
                setYear(queryYear);
            }
        }
    }, [location.search, month, year]);

    // Xử lý thay đổi tháng
    const handleMonthChange = (increment) => {
        const newMonth = increment
            ? (month % 12) + 1
            : month === 1
            ? 12
            : month - 1;
        const newYear =
            increment && month === 12
                ? year + 1
                : !increment && month === 1
                ? year - 1
                : year;
        setMonth(newMonth);
        setYear(newYear);
        navigate(`/admin-panel?month=${newMonth}&year=${newYear}`);
    };

    // Xử lý thay đổi năm
    const handleYearChange = (increment) => {
        const newYear = increment ? year + 1 : year - 1;
        setYear(newYear);
        navigate(`/admin-panel?month=${month}&year=${newYear}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    type === "Quantity"
                        ? await fetch(
                              `${SUMMARY_API.getByMonthAndYear.url}?month=${month}&year=${year}`,
                              {
                                  method: SUMMARY_API.getByMonthAndYear.method,
                                  credentials: "include",
                              }
                          )
                        : await fetch(
                              `${SUMMARY_API.getTotalOfOrderDetailsByMonthAndYear.url}?month=${month}&year=${year}`,
                              {
                                  method: SUMMARY_API
                                      .getTotalOfOrderDetailsByMonthAndYear
                                      .method,
                                  credentials: "include",
                              }
                          );
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                    setLabels(result.data.map((item) => item._id));
                    console.log(result.data);
                }
            } catch (error) {
                console.error("Fetch data error:", error);
            }
        };

        fetchData();
    }, [month, year, type]);

    const { t } = useTranslation();
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "black",
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: "THỐNG KẾ THÁNG " + month + " NĂM " + year,
            },
        },
    };
    const colors = [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
        "rgba(199, 199, 199, 0.8)",
        "rgba(83, 102, 255, 0.8)",
        "rgba(40, 159, 64, 0.8)",
        "rgba(255, 99, 255, 0.8)",
    ];
    const dataBar = {
        labels: labels,
        datasets: [
            {
                label: t("quantity"),
                data: data.map((item) => item.totalQuantity),
                backgroundColor: data.map(
                    (_, index) => colors[index % colors.length]
                ),
            },
        ],
    };
    const dataBar1 = {
        labels: labels,
        datasets: [
            {
                label: t("revenue"),
                data: data.map((item) => item.total),
                backgroundColor: data.map(
                    (_, index) => colors[index % colors.length]
                ),
            },
        ],
    };
    return (
        <div className="container p-8">
            <select
                name="type"
                id="type"
                className="p-4 mb-8 text-xl font-bold border-2 border-gray-400 rounded-md shadow-md dark:text-neutral-900"
                onChange={(e) => setType(e.target.value)}
            >
                <option value="Quantity">{t("quantity")}</option>
                <option value="Revenue">{t("revenue")}</option>
            </select>

            <div>
                <h2 className="text-xl italic font-bold">
                    {t("admin.db.monthly-statistics")} ({type})
                </h2>
                <div className="flex flex-col gap-8 py-4 overflow-x-auto lg:items-center lg:flex-row">
                    <div className="flex items-center gap-4 ">
                        <h4 className="text-xl min-w-[100px] italic font-bold text-blue-600 dark:text-blue-300">
                            {t("admin.db.month")}:
                        </h4>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <FaChevronLeft
                                className="w-12 h-12 p-3 rounded-full shadow-md dark:text-white "
                                onClick={() => handleMonthChange(false)}
                            />
                            <input
                                type="text"
                                value={month}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none dark:text-blue-950"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 rounded-full shadow-md dark:text-white"
                                onClick={() => handleMonthChange(true)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h4 className="text-xl min-w-[100px] italic font-bold text-blue-600 dark:text-blue-300 ">
                            {t("admin.db.year")}:
                        </h4>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <FaChevronLeft
                                className="w-12 h-12 p-3 rounded-full shadow-md dark:text-white"
                                onClick={() => handleYearChange(false)}
                            />
                            <input
                                type="text"
                                value={year}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none dark:text-blue-950"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 rounded-full shadow-md dark:text-white"
                                onClick={() => handleYearChange(true)}
                            />
                        </div>
                    </div>
                </div>
                {data ? (
                    <div className="">
                        {type === "Quantity" ? (
                            <div>
                                <Bar data={dataBar} options={options}></Bar>
                            </div>
                        ) : (
                            <div>
                                <Bar data={dataBar1} options={options}></Bar>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>No have data</div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
