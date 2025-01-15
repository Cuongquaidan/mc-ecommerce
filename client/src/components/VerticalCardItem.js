import React from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { useContextGlobal } from "../context";
import { useSelector } from "react-redux";
import checkPromotion from "../helpers/checkPromotion";
import { IoMdStar } from "react-icons/io";
function VerticalCardItem({ product, ...props }) {
    const { fetchGetCart } = useContextGlobal();

    const promotionDetails = useSelector((state) => state?.promotionDetails);

    const cartProducts = useSelector((state) => state?.cart?.cart?.products);
    const cartProductIds = cartProducts?.map((product) => product.product._id);
    return (
        <Link
            to={"/product/" + product?._id}
            className="w-full min-w-[280px]   md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow-md "
        >
            <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] overflow-hidden flex justify-center items-center relative">
                <img
                    src={product.productImages[0]}
                    alt="MCSHOP"
                    className="object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply"
                />
                {checkPromotion(promotionDetails, product) && (
                    <div className="absolute flex items-center justify-center w-full h-8 text-white rotate-45 bg-red-500 top-2 -right-32">
                        <p className="text-center">Sale</p>
                    </div>
                )}
            </div>
            <div className="grid gap-3 p-4">
                <h2 className="text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1">
                    {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>

                {(() => {
                    const promotion = checkPromotion(promotionDetails, product);

                    if (promotion) {
                        const discountedPrice = (
                            product.selling - promotion.discount
                        ).toFixed(2);

                        return (
                            <div className="flex gap-3">
                                <p className="font-medium text-green-600">
                                    {discountedPrice.toLocaleString()}$
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
                                {product.selling.toLocaleString()}$
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
                        <IoMdStar size={20} className="text-yellow-500 " />
                    </div>
                </div>

                <button
                    onClick={(e) => addToCart(e, product._id, 1, fetchGetCart)}
                    disabled={cartProductIds?.includes(product._id)}
                    className="px-3 py-3 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                    {cartProductIds?.includes(product._id)
                        ? "Added"
                        : "Add to cart"}
                </button>
            </div>
        </Link>
    );
}

export default VerticalCardItem;
