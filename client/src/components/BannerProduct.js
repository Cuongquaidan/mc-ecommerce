import React, { useEffect, useState, useCallback } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.webp";
import image4 from "../assest/banner/img4.webp";
import image5 from "../assest/banner/img5.webp";
import image6 from "../assest/banner/img6.webp";
import image7 from "../assest/banner/img7.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { motion } from "framer-motion";
import variants from "../helpers/variantMotion";

function BannerProduct() {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
    ];
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ];

    const totalImages = desktopImages.length;

    const nextImage = useCallback(() => {
        setCurrentImage((prev) => (prev + 1) % totalImages);
    }, [totalImages]);

    const prevImage = useCallback(() => {
        setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
    }, [totalImages]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [nextImage]); // Thêm `nextImage` vào dependency array

    return (
        <motion.div
            variants={variants}
            initial="initial"
            whileInView="whileInView"
            className="container px-4 mx-auto rounded"
        >
            <div className="relative w-full h-56 md:h-screen bg-slate-200">
                {/* Desktop navigation buttons */}
                <div className="absolute z-10 items-center hidden w-full h-full md:flex">
                    <div className="flex justify-between w-full text-2xl ">
                        <button
                            onClick={prevImage}
                            className="p-4 bg-gray-100 rounded-full shadow-md ml-[-24px] border border-gray-300 dark:bg-neutral-950 dark:text-slate-300 "
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-4 bg-gray-100 rounded-full shadow-md mr-[-24px] border border-gray-300 dark:bg-neutral-950 dark:text-slate-300 "
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop version */}
                <div className="hidden w-full h-full overflow-hidden md:flex">
                    {desktopImages.map((imageURL, index) => (
                        <motion.div
                            className="w-full h-full transition-all shrink-0"
                            key={index}
                            style={{
                                transform: `translateX(-${
                                    currentImage * 100
                                }%) `,
                            }}
                        >
                            <img
                                src={imageURL}
                                className="w-full h-full"
                                alt="MCSHOP"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className="flex w-full h-full overflow-hidden md:hidden">
                    {mobileImages.map((imageURL, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-all"
                            key={index}
                            style={{
                                transform: `translateX(-${
                                    currentImage * 100
                                }%)`,
                            }}
                        >
                            <img
                                src={imageURL}
                                className="object-cover w-full h-full"
                                alt="MCSHOP"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default BannerProduct;
