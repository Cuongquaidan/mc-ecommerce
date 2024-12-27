import React, { useEffect, useState } from "react";
import SUMMARY_API from "../common";
import { Link } from "react-router-dom";

function CategoryList() {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(12).fill(0);
    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(`${SUMMARY_API.productCategory.url}`);

        if (response.ok) {
            const data = await response.json();
            setCategoryProduct(data.data);
            setLoading(false);
        } else {
            console.error("Failed to fetch category product");
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);
    return (
        <div>
            <div className="flex items-center gap-10 p-4 overflow-scroll scrollbar-hide">
                {loading
                    ? categoryLoading.map((_, index) => (
                          <div
                              className="w-20 h-20 overflow-hidden rounded-full shadow-md bg-slate-200 animate-pulse"
                              key={index}
                          ></div>
                      ))
                    : categoryProduct?.map((product) => (
                          <Link
                              to={
                                  "/product-category?category=" +
                                  product?.category
                              }
                              key={product._id}
                              className="flex flex-col items-center gap-2 cursor-pointer"
                          >
                              <div className="flex items-center justify-center w-20 h-20 p-3 overflow-hidden rounded-full shadow-md bg-slate-200">
                                  <img
                                      className="object-contain w-full h-full transition-all mix-blend-multiply hover:scale-110"
                                      src={product.productImages[0]}
                                      alt={product.description}
                                  ></img>
                              </div>
                              <h3 className="text-sm font-medium capitalize">
                                  {product.category}
                              </h3>
                          </Link>
                      ))}
            </div>
        </div>
    );
}

export default CategoryList;
