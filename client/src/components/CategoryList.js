import React, { useEffect, useRef, useState } from "react";
import SUMMARY_API from "../common";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion";
import variants from "../helpers/variantMotion";

function CategoryList() {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [slow, setSlow] = useState(false);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(12).fill(0);
    const controls = useAnimation();

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

    const { t } = useTranslation();
    const container = useRef(null);

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // Cập nhật animation khi slow hoặc categoryProduct thay đổi
    useEffect(() => {
        const distance = categoryProduct.length * 200;
        controls.stop();
        controls.start({
            x: `-${distance}px`,
            transition: {
                repeat: Infinity,
                duration: categoryProduct.length * (slow ? 4 : 2),
                ease: "linear",
            },
        });
    }, [slow, categoryProduct, controls]);

    return (
        <motion.div
            className="flex gap-10 p-4 overflow-hidden"
            onMouseEnter={() => setSlow(true)}
            onMouseLeave={() => setSlow(false)}
            ref={container}
        >
            <motion.div animate={controls} className="flex items-center gap-10">
                {loading
                    ? categoryLoading.map((_, index) => (
                          <div
                              className="w-40 h-40 p-3 overflow-hidden rounded-md shadow-md dark:bg-neutral-900 border-neutral-600 bg-slate-200 animate-pulse"
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
                          >
                              <motion.div
                                  variants={variants}
                                  initial="initial"
                                  whileInView="whileInView"
                                  className="flex flex-col items-center gap-2 cursor-pointer"
                              >
                                  <div className="flex items-center justify-center w-40 h-40 p-3 overflow-hidden rounded-md shadow-md dark:bg-neutral-900 border-neutral-600 bg-slate-200 dark:border">
                                      <img
                                          className="object-contain w-full h-full transition-all mix-blend-multiply dark:mix-blend-normal hover:scale-110"
                                          src={product.productImages[0]}
                                          alt={product.description}
                                      />
                                  </div>
                                  <h3 className="text-sm font-medium">
                                      {t(product.category)}
                                  </h3>
                              </motion.div>
                          </Link>
                      ))}
            </motion.div>
            <motion.div animate={controls} className="flex items-center gap-10">
                {loading
                    ? categoryLoading.map((_, index) => (
                          <div
                              className="w-40 h-40 p-3 overflow-hidden rounded-md shadow-md dark:bg-neutral-900 border-neutral-600 bg-slate-200 animate-pulse"
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
                          >
                              <motion.div
                                  variants={variants}
                                  initial="initial"
                                  whileInView="whileInView"
                                  className="flex flex-col items-center gap-2 cursor-pointer"
                              >
                                  <div className="flex items-center justify-center w-40 h-40 p-3 overflow-hidden rounded-md shadow-md dark:bg-neutral-900 border-neutral-600 bg-slate-200 dark:border">
                                      <img
                                          className="object-contain w-full h-full transition-all mix-blend-multiply dark:mix-blend-normal hover:scale-110"
                                          src={product.productImages[0]}
                                          alt={product.description}
                                      />
                                  </div>
                                  <h3 className="text-sm font-medium">
                                      {t(product.category)}
                                  </h3>
                              </motion.div>
                          </Link>
                      ))}
            </motion.div>
        </motion.div>
    );
}

export default CategoryList;
