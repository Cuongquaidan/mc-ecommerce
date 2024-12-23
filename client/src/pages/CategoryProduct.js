import React from "react";
import { useParams } from "react-router-dom";

function CategoryProduct() {
    const params = useParams();
    const category = params?.category;
    return <div>CategoryProduct</div>;
}

export default CategoryProduct;
