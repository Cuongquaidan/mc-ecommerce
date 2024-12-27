import React from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link
            to={"/"}
            className="lg:text-2xl text-md italic font-bold text-yellow-500 bg-blue-700 rounded-xl max-w-[200px] h-[56px] flex items-center text-center p-2"
        >
            MC-SHOP
        </Link>
    );
}

export default Logo;
