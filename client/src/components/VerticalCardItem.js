import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { useContextGlobal } from "../context";
import { useSelector } from "react-redux";
import checkPromotion from "../helpers/checkPromotion";
import { IoMdStar } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import variants from "../helpers/variantMotion";
function VerticalCardItem({ product, ...props }) {
    const { fetchGetCart } = useContextGlobal();
    const [isHover, setIsHover] = useState(false);
    const { t } = useTranslation();
    const promotionDetails = useSelector((state) => state?.promotionDetails);

    const cartProducts = useSelector((state) => state?.cart?.cart?.products);
    const cartProductIds = cartProducts?.map((product) => product.product._id);
    const [indexImage, setIndexImage] = useState(0);
    const intervalRef = useRef(null); // Lưu trữ interval ID

    const handleMouseEnter = () => {
        setIsHover(true);
        // Đặt một timeout trước khi chuyển đổi hình

        intervalRef.current = setInterval(() => {
            setIndexImage((prev) =>
                prev === product.productImages.length - 1 ? 0 : prev + 1
            );
        }, 2000);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
        // Xóa timeout và interval khi chuột rời đi

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIndexImage(0);
    };
    return (
        <Link
            to={"/product/" + product?._id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                variants={variants}
                initial="initial"
                whileInView="whileInView"
                className="w-full overflow-hidden min-w-[280px]   md:min-w-[320px] dark:border border-neutral-600  max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow-md dark:bg-neutral-900 dark:text-slate-300 "
            >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] overflow-hidden flex justify-center items-center relative dark:bg-transparent">
                    {product.productImages.map((image, idx) => (
                        <img
                            key={idx}
                            src={image}
                            className={`absolute top-[10%] left-0 h-[80%] mix-blend-multiply dark:mix-blend-normal w-full object-scale-down transition-transform duration-500 ease-in-out ${
                                idx === indexImage
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-full opacity-0"
                            }`}
                            alt={product.description}
                        />
                    ))}
                    {checkPromotion(promotionDetails, product) && (
                        <div className="absolute flex items-center justify-center w-full h-8 text-white rotate-45 bg-red-500 top-2 -right-32">
                            <p className="text-center">{t("sale")}</p>
                        </div>
                    )}
                </div>
                <motion.div
                    initial={{
                        y: 30,
                    }}
                    animate={{
                        y: isHover ? 0 : 30,
                    }}
                    className="grid gap-3 p-4"
                >
                    <h2 className="text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1 dark:text-slate-100">
                        {product?.productName}
                    </h2>
                    <p className="capitalize dark:text-slate-100 text-slate-500">
                        {t(product?.category)}
                    </p>

                    {(() => {
                        const promotion = checkPromotion(
                            promotionDetails,
                            product
                        );

                        if (promotion) {
                            const discountedPrice = (
                                product.selling - promotion.discount
                            ).toFixed(2);

                            return (
                                <div className="flex gap-3">
                                    <p className="font-medium text-green-600">
                                        {discountedPrice.toLocaleString()}$
                                    </p>
                                    <p className="line-through text-slate-500 dark:text-slate-100">
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
                        <div className="text-sm text-slate-500 dark:text-slate-300">
                            {t("stock")}: {product.stock}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-300">
                            {product.rating}{" "}
                            <IoMdStar size={20} className="text-yellow-500 " />
                        </div>
                    </div>

                    <motion.button
                        initial={{
                            y: 30,
                        }}
                        animate={{
                            y: isHover ? 0 : 30,
                        }}
                        onClick={(e) =>
                            addToCart(e, product._id, 1, fetchGetCart)
                        }
                        disabled={cartProductIds?.includes(product._id)}
                        className={`text-md mt-4 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-full w-[120px] mx-auto ${
                            product.stock === 0 && "bg-red-600 hover:bg-red-600"
                        }`}
                    >
                        {cartProductIds?.some((item) => item === product?._id)
                            ? t("Added")
                            : (product.stock === 0 && t("Sold out")) ||
                              t("Add to cart")}
                    </motion.button>
                </motion.div>
            </motion.div>
        </Link>
    );
}

export default VerticalCardItem;
