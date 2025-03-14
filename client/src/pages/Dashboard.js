import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import SUMMARY_API from "../common";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTranslation } from "react-i18next";
function Dashboard() {
    const [type, setType] = useState("Quantity");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);
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
                    console.log(result.data);
                }
            } catch (error) {
                console.error("Fetch data error:", error);
            }
        };

        fetchData();
    }, [month, year, type]);
    const chartSetting = {
        yAxis: [
            {
                label: `Quantity month ${month} year ${year}`,
            },
        ],
        width: 1000,
        height: 500,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translateX(-10px)",
            },
        },
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const { t } = useTranslation();
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
                                className="w-12 h-12 p-3 bg-red-400 rounded-full shadow-md dark:text-blue-950 "
                                onClick={() => handleMonthChange(false)}
                            />
                            <input
                                type="text"
                                value={month}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none dark:text-blue-950"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 bg-green-400 rounded-full shadow-md dark:text-blue-950"
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
                                className="w-12 h-12 p-3 bg-red-400 rounded-full shadow-md dark:text-blue-950"
                                onClick={() => handleYearChange(false)}
                            />
                            <input
                                type="text"
                                value={year}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none dark:text-blue-950"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 bg-green-400 rounded-full shadow-md dark:text-blue-950"
                                onClick={() => handleYearChange(true)}
                            />
                        </div>
                    </div>
                </div>
                {data ? (
                    <div className="w-full ml-8 ">
                        {type === "Quantity" ? (
                            <BarChart
                                dataset={data}
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        dataKey: "_id",
                                        colorMap: {
                                            type: "piecewise",
                                            thresholds: [
                                                new Date(2021, 1, 1),
                                                new Date(2023, 1, 1),
                                            ],
                                            colors: [
                                                "#F93827",
                                                "#FF9D23",
                                                "#16C47F",
                                            ],
                                        },
                                    },
                                ]}
                                series={[
                                    {
                                        dataKey: "totalQuantity",
                                        label: "Quantity",
                                        color: "#F93827",

                                        capitalizeFirstLetter,
                                    },
                                ]}
                                {...chartSetting}
                                className="!w-full dark:bg-white"
                            />
                        ) : (
                            <BarChart
                                dataset={data}
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        dataKey: "_id",
                                        colorMap: {
                                            type: "piecewise",
                                            thresholds: [
                                                new Date(2021, 1, 1),
                                                new Date(2023, 1, 1),
                                            ],
                                            colors: ["#FF9D23", "#16C47F"],
                                        },
                                    },
                                ]}
                                series={[
                                    {
                                        dataKey: "total",
                                        label: "Total",
                                        color: "#FF9D23",

                                        capitalizeFirstLetter,
                                    },
                                ]}
                                {...chartSetting}
                                  className="!w-full dark:bg-white"
                            />
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
