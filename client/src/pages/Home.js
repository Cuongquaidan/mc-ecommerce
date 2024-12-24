import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";

function Home() {
    return (
        <div className="container p-4 mx-auto">
            <CategoryList></CategoryList>
            <BannerProduct></BannerProduct>
        </div>
    );
}

export default Home;
