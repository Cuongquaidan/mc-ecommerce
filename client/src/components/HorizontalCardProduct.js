import React, { useEffect, useRef, useState } from "react";
import SUMMARY_API from "../common";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { useContextGlobal } from "../context";
import { useSelector } from "react-redux";
import checkPromotion from "../helpers/checkPromotion";
import { IoMdStar } from "react-icons/io";

function HorizontalCardProduct({ category, heading }) {
    const { fetchGetCart } = useContextGlobal();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollElement = useRef();
    const loadingList = new Array(13).fill(null);

    const promotionDetails = useSelector((state) => state?.promotionDetails);

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
                              <Link
                                  to={"/product/" + product?._id}
                                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow-md flex"
                              >
                                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                                      <img
                                          src={product.productImages[0]}
                                          className="object-scale-down h-full transition-all hover:scale-110"
                                          alt={product.description}
                                      />
                                  </div>
                                  <div className="relative z-10 grid p-4 overflow-hidden">
                                      {checkPromotion(
                                          promotionDetails,
                                          product
                                      ) && (
                                          <div className="absolute flex items-center justify-center w-full h-6 text-white rotate-45 bg-red-500 top-4 -right-12">
                                              <p className="text-center">
                                                  Sale
                                              </p>
                                          </div>
                                      )}

                                      <h2 className="text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1">
                                          {product?.productName}
                                      </h2>
                                      <p className="capitalize text-slate-500">
                                          {product?.category}
                                      </p>

                                      {(() => {
                                          const promotion = checkPromotion(
                                              promotionDetails,
                                              product
                                          );

                                          if (promotion) {
                                              const discountedPrice = (
                                                  product.selling -
                                                  promotion.discount
                                              ).toFixed(2);

                                              return (
                                                  <div className="flex gap-3">
                                                      <p className="font-medium text-green-600">
                                                          {discountedPrice.toLocaleString()}
                                                          $
                                                      </p>
                                                      <p className="line-through text-slate-500">
                                                          {product.selling
                                                              .toFixed(2)
                                                              .toLocaleString()}
                                                          $
                                                      </p>
                                                  </div>
                                              );
                                          } else {
                                              return (
                                                  <p className="font-medium text-green-600">
                                                      {product.selling.toLocaleString()}
                                                      $
                                                  </p>
                                              );
                                          }
                                      })()}
                                      <div className="flex justify-between">
                                          <div className="text-sm text-slate-500">
                                              Stock: {product.stock}
                                          </div>
                                          <div className="flex items-center gap-1 text-sm text-slate-500">
                                              {product.rating}{" "}
                                              <IoMdStar
                                                  size={20}
                                                  className="text-yellow-500 "
                                              />
                                          </div>
                                      </div>

                                      <button
                                          onClick={(e) =>
                                              addToCart(
                                                  e,
                                                  product._id,
                                                  1,
                                                  fetchGetCart
                                              )
                                          }
                                          className="text-md mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full w-[120px] mx-auto"
                                      >
                                          Add to Cart
                                      </button>
                                  </div>
                              </Link>
                          );
                      })}
            </div>
        </div>
    );
}

export default HorizontalCardProduct;
