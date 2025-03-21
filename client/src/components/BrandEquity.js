import { useScroll, motion, useTransform, animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
    FaShippingFast,
    FaCreditCard,
    FaShieldAlt,
    FaUndo,
    FaHeadset,
    FaMedal,
} from "react-icons/fa";
import FeatureBox from "./FeatureBox";
function BrandEquity() {
    const benefits = [
        {
            icon: <FaShippingFast size={40} className="text-blue-500" />,
            title: "FAST, FREE DELIVERY",
            description: "Free shipping in 3-7 days on all orders.",
        },
        {
            icon: <FaMedal size={40} className="text-blue-500" />,
            title: "MCHEATHYCREDITS REWARDS",
            description: "Buy more, save more, and earn more.",
        },
        {
            icon: <FaCreditCard size={40} className="text-blue-500" />,
            title: "PAY WITH EASE",
            description: "Pay immediately or in installments with Affirm.",
        },
        {
            icon: <FaUndo size={40} className="text-blue-500" />,
            title: "30-DAY MONEY-BACK GUARANTEE",
            description: "Return within 30 days for a full refund.",
        },
        {
            icon: <FaShieldAlt size={40} className="text-blue-500" />,
            title: "HASSLE-FREE WARRANTY",
            description: "Comprehensive warranty protection on all purchases.",
        },
        {
            icon: <FaHeadset size={40} className="text-blue-500" />,
            title: "WE ARE HERE TO HELP",
            description: "Contact our expert team via email or live chat.",
        },
    ];
    const ref = useRef();
    const [showLayout, setShowLayout] = useState(false);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: showLayout ? 1 : 0,
        },
    };
    // const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
    const width = useTransform(scrollYProgress, [0, 1], ["1400px", "680px"]);
    const height = useTransform(scrollYProgress, [0, 1], ["788px", "225px"]);
    const containerHeight = useTransform(
        scrollYProgress,
        [0, 1],
        ["788px", "440px"]
    );
    const sideWidth = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setShowLayout(latest === 1);
        });
    }, [scrollYProgress]);

    return (
        <div
            className="container px-4 mx-auto my-6 min-h-[300vh] relative"
            ref={ref}
        >
            <motion.div className="sticky top-0 h-screen py-20">
                <motion.h2
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    className="mb-10 text-4xl font-bold text-blue-500 dark:text-slate-100"
                >
                    SHOP WITH CONFIDENCE AT MC-SHOP
                </motion.h2>

                <motion.div
                    className="flex items-center justify-center gap-2"
                    style={{
                        height: containerHeight,
                    }}
                >
                    {/* Cột trống bên trái */}
                    <motion.div
                        style={{
                            width: sideWidth,
                        }}
                        initial={{ flexShrink: 1, opacity: 0 }}
                        animate={{
                            flexShrink: showLayout ? 0 : 1,
                            opacity: showLayout ? 1 : 0,
                        }}
                        className="flex flex-col h-full gap-4"
                    >
                        <FeatureBox
                            icon={benefits[0].icon}
                            title={benefits[0].title}
                            description={benefits[0].description}
                            isVertical={true}
                            isGrow={true}
                        />
                        <FeatureBox
                            icon={benefits[1].icon}
                            title={benefits[1].title}
                            description={benefits[1].description}
                            isVertical={true}
                        />
                    </motion.div>

                    <motion.div className="flex-1">
                        <motion.div
                            style={{ width, height }}
                            className="flex flex-col items-center justify-center w-full mx-auto text-center text-white bg-blue-400 rounded-lg dark:bg-blue-500"
                        >
                            <h2 className="text-4xl font-bold">MC SHOP</h2>
                            <p className="p-2 text-2xl font-medium">
                                The World's
                            </p>
                            <p className="text-6xl font-black">NO. 1</p>
                            <p className="text-2xl font-medium">
                                Electronic brand
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex gap-4 p-4 pb-0"
                            style={{
                                opacity: showLayout ? 1 : 0,
                            }}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                        >
                            <FeatureBox
                                icon={benefits[2].icon}
                                title={benefits[2].title}
                                description={benefits[2].description}
                            />
                            <FeatureBox
                                icon={benefits[3].icon}
                                title={benefits[3].title}
                                description={benefits[3].description}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{
                            width: sideWidth,
                        }}
                        initial={{ flexShrink: 1, opacity: 0 }}
                        animate={{
                            flexShrink: showLayout ? 0 : 1,
                            opacity: showLayout ? 1 : 0,
                        }}
                        className="flex flex-col h-full gap-4"
                    >
                        <FeatureBox
                            icon={benefits[4].icon}
                            title={benefits[4].title}
                            description={benefits[4].description}
                            isVertical={true}
                        />
                        <FeatureBox
                            icon={benefits[5].icon}
                            title={benefits[5].title}
                            description={benefits[5].description}
                            isVertical={true}
                            isGrow={true}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default BrandEquity;
