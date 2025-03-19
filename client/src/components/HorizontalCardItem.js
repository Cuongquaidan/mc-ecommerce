import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { useContextGlobal } from "../context";
import checkPromotion from "../helpers/checkPromotion";
import { IoMdStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {motion} from "framer-motion";
import variants from "../helpers/variantMotion";
function HorizontalCardItem({ product, ...props }) {
    const {t} = useTranslation();
    const { fetchGetCart } = useContextGlobal();
    const promotionDetails = useSelector((state) => state?.promotionDetails);
    const cartProducts = useSelector((state) => state?.cart?.cart?.products);
    const cartProductIds = cartProducts?.map((product) => product.product._id);
    const [indexImage, setIndexImage] = useState(0);
    const intervalRef = useRef(null); // Lưu trữ interval ID
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        // Đặt một timeout trước khi chuyển đổi hình
        setIsHover(true);
        intervalRef.current = setInterval(() => {
            setIndexImage((prev) =>
                prev === product.productImages.length - 1 ? 0 : prev + 1
            );
        }, 2000);
    };

    const handleMouseLeave = () => {
        // Xóa timeout và interval khi chuột rời đi
        setIsHover(false);
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
           <motion.div variants={variants} initial="initial" whileInView="whileInView"  className="w-full relative min-w-[280px] border-neutral-800 dark:border md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-48 bg-white rounded-md shadow-md flex dark:bg-neutral-950 overflow-hidden ">
           <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] dark:bg-transparent relative overflow-hidden dark:bg-neutral-200 ">
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
            </div>
            {checkPromotion(promotionDetails, product) && (
                    <div className="absolute flex items-center justify-center w-full h-6 text-white rotate-45 bg-red-500 top-4 -right-32">
                        <p className="text-center">
                            {t("sale")}
                        </p>
                    </div>
                )}
            <motion.div className="relative z-10 grid p-4 overflow-hidden" 
                initial={{
                   y: 30
                }}
                animate={{
                    y: isHover ? 0 : 30
                }}
            >
             
                <h2 className="text-xl font-medium text-slate-700 dark:text-slate-100 text-ellipsis line-clamp-1">
                    {product?.productName}
                </h2>
                <p className="capitalize text-slate-500 dark:text-slate-100">{product?.category}</p>

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
                            <p className="font-medium text-green-600 ">
                                {product.selling.toLocaleString()}$
                            </p>
                        );
                    }
                })()}
                <div className="flex justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-300" >
                        {t("stock")}: {product.stock}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-300">
                        {product.rating}{" "}
                        <IoMdStar size={20} className="text-yellow-500 " />
                    </div>
                </div>

                <motion.button
    onClick={(e) => addToCart(e, product._id, 1, fetchGetCart)}
    disabled={
        cartProductIds?.some((item) => item === product?._id) ||
        product.stock === 0
    }
    initial={{ y: 30 }}
    animate={{ y: isHover ? 0 : 30 }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    className={`text-md mt-4 bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 transition-all rounded-full w-[120px] mx-auto
        ${product.stock === 0 && "bg-red-600 hover:bg-red-600"}`}
>
    {cartProductIds?.some((item) => item === product?._id)
        ? t("Added")
        : (product.stock === 0 ? t("Sold out") : t("Add to cart"))}
</motion.button>
            </motion.div>
           </motion.div>
        </Link>
    );
}

export default HorizontalCardItem;
