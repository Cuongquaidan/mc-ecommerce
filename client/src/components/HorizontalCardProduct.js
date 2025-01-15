import React, { useEffect, useRef, useState } from "react";
import SUMMARY_API from "../common";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { useSelector } from "react-redux";
import HorizontalCardItem from "./HorizontalCardItem";

function HorizontalCardProduct({ category, heading }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollElement = useRef();
    const loadingList = new Array(13).fill(null);

    useEffect(() => {
        const fetchCategoryWise = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${SUMMARY_API.categoryWiseProduct.url}`,
                    {
                        method: SUMMARY_API.categoryWiseProduct.method,
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({ category }),
                    }
                );

                if (!response.ok)
                    throw new Error("Failed to fetch category wise product");

                const resjson = await response.json();
                setData(resjson.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch category wise product");
            }
        };
        fetchCategoryWise();
    }, [category]);
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container relative px-4 mx-auto my-6">
            <h2 className="py-4 text-2xl font-semibold">{heading}</h2>

            <div
                className="flex items-center gap-4 overflow-scroll transition-all md:gap-6 scrollbar-hide"
                ref={scrollElement}
            >
                <button
                    className="absolute z-50 hidden p-4 text-lg bg-white border border-gray-300 rounded-full shadow-md -left-2 md:block "
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="absolute z-50 hidden p-4 text-lg bg-white border border-gray-300 rounded-full shadow-md -right-2 md:block"
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {loading
                    ? loadingList.map((product, index) => {
                          return (
                              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                                  <div className="grid w-full gap-2 p-4">
                                      <div className="p-1 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse"></div>
                                      <p className="p-1 capitalize rounded-full text-slate-500 bg-slate-200 animate-pulse"></p>
                                      <div className="flex w-full gap-3">
                                          <p className="w-full p-1 font-medium text-red-600 rounded-full bg-slate-200 animate-pulse"></p>
                                          <p className="w-full p-1 line-through rounded-full text-slate-500 bg-slate-200 animate-pulse"></p>
                                      </div>
                                      <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                                  </div>
                              </div>
                          );
                      })
                    : data?.map((product, index) => {
                          return (
                              <HorizontalCardItem
                                  product={product}
                                  key={index}
                              ></HorizontalCardItem>
                          );
                      })}
            </div>
        </div>
    );
}

export default HorizontalCardProduct;
