import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalCard from "../components/ListCardSearch";
import SummaryApi from "../common";
import { LuFilter } from "react-icons/lu";
import { LuFilterX } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const CategoryProduct = () => {
    const [productCategory, setProductCategory] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái mở/đóng sidebar
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach((el) => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const {t} = useTranslation();
    const fetchData = async () => {
        
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: filterCategoryList,
            }),
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
        setLoading(false);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`${SummaryApi.getAllCategories.url}`);
            if (!response.ok) {
                throw new Error("Failed to fetch category");
            }
            const data = await response.json();
            setProductCategory(data.data);
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(
            (key) => selectCategory[key]
        );

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory
            .map((el) => `category=${el}`)
            .join("&");
        navigate(`/product-category?${urlFormat}`);
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        const sortedData = [...data].sort((a, b) =>
            value === "asc" ? a.selling - b.selling : b.selling - a.selling
        );
        setData(sortedData);
    };

    return (
        <div className="container p-4 mx-auto">
            {/*** Nút đóng/mở sidebar ở breakpoint lg */}
            <button
                className={`px-4 py-2 mb-4 text-2xl  font-bold  rounded lg:hidden ${
                    isSidebarOpen ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <LuFilterX /> : <LuFilter />}
            </button>

            <div className="lg:grid grid-cols-[300px,1fr]">
                {/** Sidebar: Hiển thị dựa trên trạng thái isSidebarOpen */}
                <div
                    className={`bg-white p-2 dark:bg-neutral-950 dark:text-slate-300 dark:border border-neutral-800 lg:block ${
                        isSidebarOpen ? "block" : "hidden"
                    } flex-col gap-5 max-h-[calc(100vh-120px)]  scrollbar-hide`}
                >
                    {/** Sắp xếp */}
                    <div className="mb-4">
                        <h3 className="pb-1 text-base font-medium uppercase border-b text-slate-500 border-slate-300">
                            
                        </h3>
                        <form className="flex flex-col gap-2 py-2 text-sm">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "asc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"asc"}
                                />
                                <label>{t("plth")}</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "dsc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"dsc"}
                                />
                                <label>{t("phtl")}</label>
                            </div>
                        </form>
                    </div>

                    {/** Lọc danh mục */}
                    <div>
                        <h3 className="pb-1 text-base font-medium uppercase border-b text-slate-500 border-slate-300">
                            {t("category")}
                        </h3>
                        <form className="grid grid-cols-2 gap-2 py-2 text-sm lg:flex lg:flex-col">
                            {productCategory.map((categoryName) => (
                                <div
                                    key={categoryName.value}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        name={"category"}
                                        checked={
                                            selectCategory[categoryName.value]
                                        }
                                        value={categoryName.value}
                                        id={categoryName.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName.value}>
                                        {t(categoryName.value)}
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/** Danh sách sản phẩm */}
                <div className="px-4">
                    <p className="my-2 text-lg font-medium text-slate-800 dark:text-slate-100">
                        {t("search-result")}: {data.length}
                    </p>
                    <div className="min-h-[calc(100vh-120px)] p-4 ">
                        {data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading} />
                        )}
                        {loading && <p>Đang tải dữ liệu...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
