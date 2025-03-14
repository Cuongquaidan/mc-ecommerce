import React, { useRef, useState } from "react";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../context";
import checkPromotion from "../helpers/checkPromotion";
import { useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import { useTranslation } from "react-i18next";

function SearchCard({ product, ...props }) {
    const {t} = useTranslation();
    const { fetchGetCart } = useContextGlobal();
    const promotionDetails = useSelector((state) => state?.promotionDetails);
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id, 1, fetchGetCart);
    };
    const cartProducts = useSelector((state) => state?.cart?.cart?.products);
    const cartProductIds = cartProducts?.map((product) => product.product._id);
    const [indexImage, setIndexImage] = useState(0);
    const intervalRef = useRef(null); // Lưu trữ interval ID
    const handleMouseEnter = () => {
        // Đặt một timeout trước khi chuyển đổi hình

        intervalRef.current = setInterval(() => {
            setIndexImage((prev) =>
                prev === product.productImages.length - 1 ? 0 : prev + 1
            );
        }, 2000);
        // Đợi 0.2 giây trước khi bắt đầu chuyển đổi
    };

    const handleMouseLeave = () => {
        // Xóa timeout và interval khi chuột rời đi

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIndexImage(0);
    };
    return (
        <Link
            {...props}
            to={"/product/" + product?._id}
            className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="bg-slate-200 relative overflow-hidden h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                {product.productImages.map((image, idx) => (
                    <img
                        key={idx}
                        src={image}
                        className={`absolute top-[10%] left-0 h-[80%] mix-blend-multiply w-full object-scale-down transition-transform duration-500 ease-in-out ${
                            idx === indexImage
                                ? "translate-x-0 opacity-100"
                                : "translate-x-full opacity-0"
                        }`}
                        alt={product.description}
                    />
                ))}
                {checkPromotion(promotionDetails, product) && (
                    <div className="absolute flex items-center justify-center w-full h-8 text-white rotate-45 bg-red-500 top-2 -right-32">
                        <p className="text-center">
                            {t("sale")}
                        </p>
                    </div>
                )}
            </div>
            <div className="grid gap-3 p-4">
                <h2 className="text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1">
                    {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{t(product?.category)}</p>
                {(() => {
                    const promotion = checkPromotion(promotionDetails, product);

                    if (promotion) {
                        const discountedPrice = (
                            product.selling - promotion.discount
                        ).toFixed(2);

                        return (
                            <div className="flex gap-3">
                                <p className="text-lg font-medium text-green-600">
                                    {discountedPrice.toLocaleString()}$
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
                                {product.selling.toLocaleString()}$
                            </p>
                        );
                    }
                })()}
                <div className="flex justify-between">
                    <div className="text-sm text-slate-500">
                        {t("stock")}: {product.stock}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                        {product.rating}{" "}
                        <IoMdStar size={20} className="text-yellow-500 " />
                    </div>
                </div>

                <button
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    disabled={cartProductIds?.includes(product?._id)}
                    className={`text-md mt-4 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-full w-[120px] mx-auto ${
                        product.stock === 0 && "bg-red-600 hover:bg-red-600"
                    }`}
                >
                    {cartProductIds?.some((item) => item === product?._id)
                        ? (t("Added"))
                        : (product.stock === 0 && t("Sold out")) || t("Add to cart")}
                </button>
            </div>
        </Link>
    );
}

export default SearchCard;
