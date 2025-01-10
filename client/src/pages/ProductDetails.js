import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import VerticalCardProduct from "../components/VerticalCardProduct";
import checkPromotion from "../helpers/checkPromotion";
import { useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
// logic zoom ảnh
//  Lay toa do theo phan tram
// Dat lai vi tri scale  (điểm gốc biến đổi (transform origin))
const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImages: [],
        description: "",
        price: "",
        selling: "",
    });
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState("");

    const [zoom, setZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();

    const fetchProductDetails = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                productId: params?.id,
            }),
        });
        setLoading(false);
        const dataResponse = await response.json();

        setData(dataResponse?.data);
        setActiveImage(dataResponse?.data?.productImages[0]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductDetails();
    }, [params]);

    const handleMouseMove = useCallback((e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    }, []);

    const promotionDetails = useSelector((state) => state?.promotionDetails);
    const handleMouseEnter = () => setZoom(true);

    const handleMouseLeave = () => setZoom(false);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 items-center">
                {/*** Product Image Section ***/}
                <div className="flex flex-col items-center gap-4 h-96 lg:flex-row-reverse">
                    <div
                        className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={activeImage}
                            className={`object-cover w-full h-full ${
                                zoom ? "scale-[2]" : ""
                            }`}
                            alt="Product"
                            style={{
                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            }}
                        />
                    </div>

                    <div className="h-full">
                        {loading ? (
                            <div className="flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-hide">
                                {productImageListLoading.map((_, index) => (
                                    <div
                                        className="w-20 h-20 rounded bg-slate-200 animate-pulse"
                                        key={"loadingImage" + index}
                                    ></div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-hide">
                                {data?.productImages?.map((imgURL) => (
                                    <div
                                        className="w-20 h-20 p-1 rounded bg-slate-200"
                                        key={imgURL}
                                    >
                                        <img
                                            src={imgURL}
                                            alt="MCSHOP"
                                            className="object-scale-down w-full h-full cursor-pointer mix-blend-multiply"
                                            onMouseEnter={() =>
                                                setActiveImage(imgURL)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/*** Product Details Section ***/}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                        <p className="inline-block px-2 text-blue-600 bg-blue-200 rounded-full w-fit">
                            {data?.brandName}
                        </p>
                        {checkPromotion(promotionDetails, data) && (
                            <p className="inline-block px-2 text-red-600 bg-red-200 rounded-full w-fit">
                                Sale
                            </p>
                        )}
                    </div>
                    <h2 className="text-2xl font-medium lg:text-4xl">
                        {data?.productName}
                    </h2>
                    <p className="capitalize text-slate-400">
                        {data?.category}
                    </p>

                    <div className="text-md text-slate-400">
                        Stock: {data?.stock}
                    </div>
                    <div className="flex items-center gap-1 text-md text-slate-400">
                        {data?.rating}{" "}
                        <IoMdStar size={25} className="text-yellow-500 " />
                    </div>

                    {(() => {
                        const promotion = checkPromotion(
                            promotionDetails,
                            data
                        );

                        if (promotion) {
                            const discountedPrice = (
                                data.selling - promotion.discount
                            ).toFixed(2);

                            return (
                                <div className="flex items-center gap-2 my-1 text-2xl font-medium lg:text-3xl">
                                    <p className="font-medium text-green-600 ">
                                        {discountedPrice.toLocaleString()}$
                                    </p>
                                    <p className="line-through text-slate-500">
                                        {data.selling
                                            .toFixed(2)
                                            .toLocaleString()}
                                        $
                                    </p>
                                </div>
                            );
                        } else {
                            return (
                                <p className="text-2xl font-medium text-green-600  lg:text-3xl">
                                    {data.selling.toLocaleString()}$
                                </p>
                            );
                        }
                    })()}

                    <div className="flex items-center gap-3 my-2">
                        <button
                            className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] text-blue-600 font-medium hover:bg-blue-600 hover:text-white"
                            onClick={(e) => handleBuyProduct(e, data?._id)}
                        >
                            Buy
                        </button>
                        <button
                            className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-blue-600 hover:bg-blue-600 bg-white hover:text-white"
                            onClick={(e) => handleAddToCart(e, data?._id)}
                        >
                            Add To Cart
                        </button>
                    </div>
                    <div>
                        <p className="my-1 font-medium text-slate-600">
                            Description:
                        </p>
                        <p>{data?.description}</p>
                    </div>
                </div>
            </div>
            {data && (
                <VerticalCardProduct
                    category={data.category}
                    heading={"Recommended Product"}
                ></VerticalCardProduct>
            )}
        </div>
    );
};

export default ProductDetails;
