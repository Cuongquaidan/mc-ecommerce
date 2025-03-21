import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";

function Logo() {
    // const { scrollY } = useScroll();
    // const [isScroll, setIsScroll] = useState(false);
    // const pathname = window.location.pathname;

    // useEffect(() => {
    //     const unsubscribe = scrollY.onChange((value) => {
    //         setIsScroll(value > 50);
    //     });
    //     return () => unsubscribe();
    // }, [scrollY]);

    // // useMemo tránh re-render không cần thiết
    // const containerStyles = useMemo(
    //     () => ({
    //         top: pathname !== "/" ? 10 : isScroll ? 10 : 200,
    //         left: pathname !== "/" ? 60 : isScroll ? 60 : "50vw",
    //         backgroundColor:
    //             pathname !== "/"
    //                 ? "transparent"
    //                 : isScroll
    //                 ? "transparent"
    //                 : "rgba(0,0,0,0.5)",
    //         borderRadius: 20,
    //         x: pathname !== "/" ? 0 : isScroll ? 0 : "-50%",
    //         padding: 10,
    //     }),
    //     [isScroll]
    // );

    return (
        <motion.div
        // initial={containerStyles}
        // animate={containerStyles}
        // transition={{ duration: 0.6, ease: "easeInOut" }}
        // className="fixed z-50 "
        >
            <Link
                to="/"
                className="lg:text-2xl text-lg italic font-bold text-yellow-500 rounded-xl max-w-[400px] h-[56px] flex items-center text-center p-2"
            >
                <motion.p
                // animate={{ fontSize: isScroll ? "1.5rem" : "2.5rem" }}
                // transition={{ duration: 0.3 }}
                >
                    MC-SHOP
                </motion.p>
            </Link>
        </motion.div>
    );
}

export default Logo;
