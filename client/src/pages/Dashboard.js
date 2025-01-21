import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import SUMMARY_API from "../common";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";
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

    return (
        <div className="container p-8">
            <select
                name="type"
                id="type"
                className="p-4 mb-8 text-xl font-bold border-2 border-gray-400 rounded-md shadow-md"
                onChange={(e) => setType(e.target.value)}
            >
                <option value="Quantity">Quantity</option>
                <option value="Revenue">Revenue</option>
            </select>

            <div>
                <h2 className="text-xl italic font-bold">
                    Monthly Statistics ({type})
                </h2>
                <div className="flex items-center gap-8 py-4">
                    <div className="flex items-center gap-4">
                        <h4 className="text-xl italic font-bold text-blue-600">
                            Month:
                        </h4>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <FaChevronLeft
                                className="w-12 h-12 p-3 bg-red-400 rounded-full shadow-md"
                                onClick={() => handleMonthChange(false)}
                            />
                            <input
                                type="text"
                                value={month}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 bg-green-400 rounded-full shadow-md"
                                onClick={() => handleMonthChange(true)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h4 className="text-xl italic font-bold text-blue-600">
                            Year:
                        </h4>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <FaChevronLeft
                                className="w-12 h-12 p-3 bg-red-400 rounded-full shadow-md"
                                onClick={() => handleYearChange(false)}
                            />
                            <input
                                type="text"
                                value={year}
                                readOnly
                                className="w-16 p-2 text-xl font-bold text-center shadow-md outline-none"
                            />
                            <FaChevronRight
                                className="w-12 h-12 p-3 bg-green-400 rounded-full shadow-md"
                                onClick={() => handleYearChange(true)}
                            />
                        </div>
                    </div>
                </div>
                {data ? (
                    <div className="w-full mx-auto ml-8">
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
