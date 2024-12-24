import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

function Home() {
    return (
        <div className="container p-4 mx-auto">
            <CategoryList></CategoryList>
            <BannerProduct></BannerProduct>
            <HorizontalCardProduct
                category={"airpodes"}
                heading={"Top Airpodes"}
            ></HorizontalCardProduct>
            <HorizontalCardProduct
                category={"earphones"}
                heading={"Top Earphones"}
            ></HorizontalCardProduct>
        </div>
    );
}

export default Home;
