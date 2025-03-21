import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import BrandEquity from "../components/BrandEquity";

function Home() {
    return (
        <div className="container p-4 mx-auto">
            <BannerProduct></BannerProduct>
            <CategoryList></CategoryList>
            <HorizontalCardProduct
                category={"airpodes"}
                heading={"Top's Airpodes"}
            />
            <HorizontalCardProduct
                category={"watches"}
                heading={"Popular's Watches"}
            />

            <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
            <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
            <VerticalCardProduct
                category={"televisions"}
                heading={"Televisions"}
            />
            <VerticalCardProduct
                category={"camera"}
                heading={"Camera & Photography"}
            />
            <VerticalCardProduct
                category={"earphones"}
                heading={"Wired Earphones"}
            />
            <VerticalCardProduct
                category={"speakers"}
                heading={"Bluetooth Speakers"}
            />
            <VerticalCardProduct
                category={"refrigerator"}
                heading={"Refrigerator"}
            />
            <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
            <BrandEquity></BrandEquity>
            <div className="h-60"></div>
        </div>
    );
}

export default Home;
