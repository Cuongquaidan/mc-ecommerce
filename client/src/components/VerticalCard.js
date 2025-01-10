import React, { useContext } from "react";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../context";
import checkPromotion from "../helpers/checkPromotion";
import { useSelector } from "react-redux";

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchGetCart } = useContextGlobal();
    const promotionDetails = useSelector((state) => state?.promotionDetails);
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id, 1, fetchGetCart);
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-4 overflow-x-scroll scrollbar-hide transition-all">
            {loading
                ? loadingList.map((product, index) => {
                      return (
                          <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
                              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                              <div className="grid gap-3 p-4">
                                  <div className="p-1 py-2 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 animate-pulse bg-slate-200"></div>
                                  <p className="p-1 py-2 capitalize rounded-full text-slate-500 animate-pulse bg-slate-200"></p>
                                  <div className="flex gap-3">
                                      <p className="w-full p-1 py-2 font-medium text-red-600 rounded-full animate-pulse bg-slate-200"></p>
                                      <p className="w-full p-1 py-2 line-through rounded-full text-slate-500 animate-pulse bg-slate-200"></p>
                                  </div>
                                  <button className="px-3 py-2 text-sm text-white rounded-full bg-slate-200 animate-pulse"></button>
                              </div>
                          </div>
                      );
                  })
                : data.map((product, index) => {
                      return (
                          <Link
                              to={"/product/" + product?._id}
                              className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow "
                          >
                              <div className="bg-slate-200 relative overflow-hidden h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                  <img
                                      src={product?.productImages[0]}
                                      className="object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply"
                                      alt="MCSHOP"
                                  />
                                  {checkPromotion(
                                      promotionDetails,
                                      product
                                  ) && (
                                      <div className="absolute flex items-center justify-center w-full h-8 text-white rotate-45 bg-red-500 top-2 -right-32">
                                          <p className="text-center">Sale</p>
                                      </div>
                                  )}
                              </div>
                              <div className="grid gap-3 p-4">
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
                                                  <p className="text-lg font-medium text-green-600">
                                                      {discountedPrice.toLocaleString()}
                                                      $
                                                  </p>
                                                  <p className="text-lg line-through text-slate-500">
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
                                  <button
                                      className="px-3 py-2 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700"
                                      onClick={(e) =>
                                          handleAddToCart(e, product?._id)
                                      }
                                  >
                                      Add to Cart
                                  </button>
                              </div>
                          </Link>
                      );
                  })}
        </div>
    );
};

export default VerticalCard;
