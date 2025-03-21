import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import VerticalCardProduct from "../components/VerticalCardProduct";
import checkPromotion from "../helpers/checkPromotion";
import { useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import moment from "moment";
import "moment/locale/vi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
// logic zoom ảnh
//  Lay toa do theo phan tram
// Dat lai vi tri scale  (điểm gốc biến đổi (transform origin))
const ProductDetails = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImages: [],
        description: "",
        price: "",
        selling: "",
    });
    const [type, setType] = useState("newest");
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState(0);
    const [preImage, setPreImage] = useState(0);
    const cartProducts = useSelector((state) => state?.cart?.cart?.products);
    const cartProductIds = cartProducts?.map((product) => product.product._id);
    // const [zoom, setZoom] = useState(false);
    // const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isBought, setIsBought] = useState(false);
    const [isShowAll, setIsShowAll] = useState(false);

    const navigate = useNavigate();
    const areaRef = useRef(null);
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
        setActiveImage(0);
    };
    const [reviews, setReviews] = useState([]);
    const [numOfRatings, setNumOfRatings] = useState({});
    const [areaHeight, setAreaHeight] = useState(30);
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: "",
    });
    const handleAddReview = async () => {
        if (newReview.rating === 0) {
            toast.error("Please rate the product.");
            return;
        }
        const response = await fetch(SummaryApi.createReview.url, {
            method: SummaryApi.createReview.method,
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                product: params.id,
                rating: newReview.rating,
                comment: newReview.comment,
            }),
        });
        const data = await response.json();
        if (data?.success) {
            setReviews([data?.data, ...reviews]);
            setNumOfRatings({
                ...numOfRatings,
                [data?.data.rating]: (numOfRatings[data?.data.rating] || 0) + 1,
            });
            setType("newest");
            setNewReview({
                rating: 0,
                comment: "",
            });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductDetails();
        const checkIsBought = async () => {
            const response = await fetch(
                SummaryApi.checkIsBought.url + "/" + params.id,
                {
                    method: SummaryApi.checkIsBought.method,
                    credentials: "include",
                }
            );
            const data = await response.json();
            setIsBought(data?.data);
        };
        checkIsBought();
    }, [params]);
    useEffect(() => {
        setAreaHeight(areaRef?.current?.scrollHeight);
    }, [newReview.comment]);

    // const handleMouseMove = useCallback((e) => {
    //     const { left, top, width, height } = e.target.getBoundingClientRect();
    //     const x = ((e.clientX - left) / width) * 100;
    //     const y = ((e.clientY - top) / height) * 100;
    //     setZoomPosition({ x, y });
    // }, []);

    const promotionDetails = useSelector((state) => state?.promotionDetails);
    // const handleMouseEnter = () => setZoom(true);

    // const handleMouseLeave = () => setZoom(false);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
    };
    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(
                SummaryApi.getReviewsByProductId.url +
                    "/" +
                    params.id +
                    "?type=" +
                    type
            );
            const data = await response.json();
            setReviews(data?.data);
            setNumOfRatings(data?.numOfRatings);
        };
        fetchReviews();
    }, [params, type]);

    const handleChangeActiveImage = (currentIndex, nextIndex) => {
        setActiveImage(nextIndex);
        setPreImage(currentIndex);
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 items-center">
                {/*** Product Image Section ***/}
                <div className="flex flex-col items-center gap-4 h-96 lg:flex-row-reverse">
                    <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative overflow-hidden">
                        {data?.productImages.map((imgURL, index) => (
                            <motion.img
                                // key={imgURL} // Cần key để React tối ưu render
                                // onMouseMove={handleMouseMove}
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                                src={imgURL}
                                className="absolute top-0 left-0 object-cover w-full h-full"
                                alt="Product"
                                animate={{
                                    y:
                                        index === activeImage
                                            ? 0
                                            : index > activeImage
                                            ? "100%"
                                            : "-100%",

                                    opacity:
                                        index === activeImage ||
                                        index === preImage
                                            ? 1
                                            : 0,
                                }}
                                initial={{
                                    y:
                                        index === activeImage
                                            ? 0
                                            : index > activeImage
                                            ? "100%"
                                            : "-100%",

                                    opacity:
                                        index === activeImage ||
                                        index === preImage
                                            ? 1
                                            : 0,
                                }}
                                transition={{
                                    y: { type: "tween", duration: 0.6 }, // Chuyển động `y` mất 0.6s
                                    opacity: { duration: 0.1 }, // `opacity` thay đổi trong 0.1s
                                }}
                            />
                        ))}
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
                                {data?.productImages?.map((imgURL, index) => (
                                    <div
                                        className="w-20 h-20 p-1 rounded bg-slate-200"
                                        key={imgURL}
                                    >
                                        <img
                                            src={imgURL}
                                            alt="MCSHOP"
                                            className="object-scale-down w-full h-full cursor-pointer mix-blend-multiply"
                                            onClick={() =>
                                                handleChangeActiveImage(
                                                    activeImage,
                                                    index
                                                )
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
                                {t("sale")}
                            </p>
                        )}
                    </div>
                    <h2 className="text-2xl font-medium lg:text-4xl">
                        {data?.productName}
                    </h2>
                    <p className="capitalize text-slate-400">
                        {t(data?.category)}
                    </p>

                    <div className="text-md text-slate-400">
                        {t("stock")}: {data?.stock}
                    </div>
                    <div className="flex items-center gap-1 text-md text-slate-400">
                        {data?.rating?.toFixed(2)}{" "}
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
                                <p className="text-2xl font-medium text-green-600 lg:text-3xl">
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
                            {t("pro-details.buy")}
                        </button>
                        <button
                            className="border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium text-blue-600 hover:bg-blue-600 bg-white hover:text-white"
                            onClick={(e) => handleAddToCart(e, data?._id)}
                            disabled={cartProductIds?.includes(data?._id)}
                        >
                            {cartProductIds?.includes(data?._id)
                                ? t("Added")
                                : t("Add to cart")}
                        </button>
                    </div>
                    <div>
                        <p className="my-1 font-medium text-slate-600">
                            {t("pro-details.desc")}
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
            <div className="container p-4 mx-auto">
                {/* Product Details Section (existing code) */}
                <div className="mt-8">
                    <div className="flex gap-4">
                        <h2 className="text-xl font-bold">
                            {t("pro-details.reviews")}
                        </h2>
                        <div className="flex items-center gap-1">
                            ( <p>{data.rating}</p>
                            <IoMdStar size={25} className="text-yellow-500 " />)
                        </div>
                    </div>
                    <div className="mt-4">
                        {isBought ? (
                            <form>
                                <div className="flex items-center gap-2">
                                    <label
                                        htmlFor="rating"
                                        className="font-medium"
                                    >
                                        {t("pro-details.rating")}
                                    </label>
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        {new Array(newReview.rating)
                                            .fill(null)
                                            .map((_, i) => (
                                                <IoMdStar
                                                    size={25}
                                                    className="text-yellow-500 "
                                                    onClick={() => {
                                                        setNewReview({
                                                            ...newReview,
                                                            rating: i + 1,
                                                        });
                                                    }}
                                                />
                                            ))}
                                        {new Array(5 - newReview.rating)
                                            .fill(null)
                                            .map((_, i) => (
                                                <IoMdStar
                                                    size={25}
                                                    className="text-gray-400 "
                                                    onClick={() => {
                                                        setNewReview({
                                                            ...newReview,
                                                            rating:
                                                                newReview.rating +
                                                                i +
                                                                1,
                                                        });
                                                    }}
                                                />
                                            ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) =>
                                            setNewReview({
                                                ...newReview,
                                                comment: e.target.value,
                                            })
                                        }
                                        placeholder="Write your review..."
                                        className="w-full p-2 overflow-hidden leading-6 border rounded resize-none"
                                        ref={areaRef}
                                        style={{
                                            minHeight: `${areaHeight}px`,
                                        }}
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
                                    onClick={handleAddReview}
                                >
                                    {t("pro-details.submit")}
                                </button>
                            </form>
                        ) : (
                            <p className="text-gray-600">
                                {t("pro-details.submit-re")}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <label htmlFor="rating" className="font-medium">
                            {t("pro-details.sort-by")}
                        </label>
                        <select
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                navigate(
                                    "/product/" +
                                        params.id +
                                        "?type=" +
                                        e.target.value
                                );
                            }}
                            className="px-2 py-1 border rounded"
                        >
                            <option value={"newest"}>
                                {t("pro-details.newest")}
                            </option>
                            <option value={"highest"}>
                                {t("pro-details.highest")}
                            </option>
                            <option value={"lowest"}>
                                {t("pro-details.lowest")}
                            </option>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star + ""}>
                                    {star} ({numOfRatings[star] || 0})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-6">
                        {reviews.length > 0 ? (
                            isShowAll ? (
                                <>
                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="flex flex-col gap-2 py-4 border-b"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">
                                                    {review.user.name}
                                                </span>

                                                <div className="flex">
                                                    {Array.from(
                                                        {
                                                            length: Math.floor(
                                                                review.rating
                                                            ),
                                                        },
                                                        (_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className="text-yellow-500"
                                                            />
                                                        )
                                                    )}
                                                    {review.rating % 1 !==
                                                        0 && (
                                                        <FaStarHalf className="text-yellow-500" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm italic text-slate-500">
                                                {moment(
                                                    review?.createdAt,
                                                    moment.ISO_8601
                                                ).fromNow()}
                                            </span>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))}
                                    <button
                                        className="italic font-bold text-red-400 underline text-md"
                                        onClick={() => setIsShowAll(false)}
                                    >
                                        {t("pro-details.hide")}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {reviews.slice(0, 3).map((review) => (
                                        <div
                                            key={review.id}
                                            className="flex flex-col gap-2 py-4 border-b"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">
                                                    {review.user.name}
                                                </span>

                                                <div className="flex">
                                                    {Array.from(
                                                        {
                                                            length: Math.floor(
                                                                review.rating
                                                            ),
                                                        },
                                                        (_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className="text-yellow-500"
                                                            />
                                                        )
                                                    )}
                                                    {review.rating % 1 !==
                                                        0 && (
                                                        <FaStarHalf className="text-yellow-500" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm italic text-slate-500">
                                                {moment(
                                                    review?.createdAt,
                                                    moment.ISO_8601
                                                ).fromNow()}
                                            </span>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))}
                                    <button
                                        className="italic font-bold text-blue-400 underline text-md"
                                        onClick={() => setIsShowAll(true)}
                                    >
                                        {t("pro-details.show")}
                                    </button>
                                </>
                            )
                        ) : (
                            <p>{t("pro-details.no-re")}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
/* <motion.img
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                src={imgURL}
                                className={`object-cover w-full h-full ${
                                    zoom ? "scale-[2]" : ""
                                } ${index === activeImage ? "" : "hidden"}`}
                                alt="Product"
                                style={{
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                }}
                            /> */
