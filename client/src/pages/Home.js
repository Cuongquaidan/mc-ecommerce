import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import SUMMARY_API from "../common";

function Home() {
    return (
        <div className="container p-4 mx-auto">
            <CategoryList></CategoryList>
        </div>
    );
}

export default Home;
