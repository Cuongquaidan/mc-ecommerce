import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import SUMMARY_API from "../common";
function ModalAddPromotion({ isOpen, onClose, type, onRefesh }) {
    const [promotion, setPromotion] = useState({
        name: "",
        startDate: "",
        endDate: "",
        discountType: "",
        discountValue: "",
        products: [],
        categories: [],
        brands: [],
    });
    const [productsTemp, setProductsTemp] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        setPromotion({
            ...promotion,
            [e.target.name]: e.target.value,
        });
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, startDate, endDate, discountType, discountValue } =
            promotion;

        if (!name || !name.trim())
            return toast.error("Promotion name is required");
        if (!startDate) return toast.error("Start date is required");
        if (!endDate) return toast.error("End date is required");
        if (new Date(startDate) > new Date(endDate))
            return toast.error("Start date must be before end date");
        if (!discountType) return toast.error("Discount type is required");
        if (!discountValue || discountValue.trim() === "")
            return toast.error("Discount value is required");
        if (
            discountType === "percentage" &&
            (discountValue < 0 || discountValue > 100)
        )
            return toast.error("Discount value must be between 0 and 100");
        if (discountType === "fixed amount" && discountValue < 0)
            return toast.error("Discount value must be greater than 0");
        if (isNaN(discountValue))
            return toast.error("Discount value must be a number");

        // Thêm loại khuyến mãi
        promotion.promotionType = type;
        console.log(promotion);
        try {
            const response = await fetch(SUMMARY_API.addPromotion.url, {
                method: SUMMARY_API.addPromotion.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(promotion),
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while adding the promotion.");
        }
        onRefesh();
    };

    // Xử lý debounce cho tìm kiếm
    const handleSearch = debounce(async (searchText) => {
        if (!searchText.trim()) {
            setData([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                SUMMARY_API.searchProduct.url + `?q=${searchText}`
            );
            if (!response.ok) throw new Error("Failed to fetch products");

            const result = await response.json();
            setData(result.data || []);
        } catch (error) {
            console.error("Search Error:", error);
            toast.error("Failed to search products");
        } finally {
            setLoading(false);
        }
    }, 300);

    // Xử lý thay đổi text tìm kiếm
    const handleTextChange = (e) => {
        const value = e.target.value;
        setText(value);
        handleSearch(value);
    };
    const fetchCategory = async () => {
        const response = await fetch(`${SUMMARY_API.getAllCategories.url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch category");
        }
        const data = await response.json();

        setCategories(data.data);
    };
    const fetchBrands = async () => {
        const response = await fetch(`${SUMMARY_API.getBrands.url}`);
        if (!response.ok) {
            throw new Error("Failed to fetch brands");
        }
        const data = await response.json();

        setBrands(data.data);
    };

    useEffect(() => {
        fetchCategory();
        fetchBrands();
    }, []);

    return (
        <div>
            <Modal open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: 600,
                        bgcolor: "white",
                        p: 4,
                        borderRadius: 2,
                        mx: "auto",
                        mt: 5,
                        maxHeight: "90vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <form
                        className="flex flex-col h-full gap-4"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Typography variant="h6" mb={2}>
                            Add New Promotion ({type})
                        </Typography>
                        <TextField
                            label="Promotion name"
                            variant="outlined"
                            name="name"
                            onChange={handleInputChange}
                        />
                        <div className="flex flex-wrap items-center gap-4">
                            <label htmlFor="startDate">Start Date:</label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                className="h-[56px] px-4 border bg-transparent border-slate-400 rounded-md text-md"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="endDate">End Date:</label>
                            <input
                                id="endDate"
                                name="endDate"
                                type="date"
                                className="h-[56px] px-4 border bg-transparent border-slate-400 rounded-md text-md"
                                onChange={handleInputChange}
                            />
                        </div>
                        <FormControl className="w-full">
                            <InputLabel id="discount-type">
                                Discount type
                            </InputLabel>
                            <Select
                                labelId="discount-type"
                                label="Discount type"
                                name="discountType"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="percentage">
                                    Percentage
                                </MenuItem>
                                <MenuItem value="fixed amount">
                                    Fixed Amount
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Discount value"
                            variant="outlined"
                            name="discountValue"
                            onChange={handleInputChange}
                        />
                        {type === "SPECIFIC PRODUCTS" && (
                            <div className="flex flex-wrap gap-4 p-4 overflow-y-scroll min-h-32 ">
                                {productsTemp.length > 0 &&
                                    productsTemp.map((product) => (
                                        <div
                                            key={product._id}
                                            className="relative flex items-center gap-4 p-4 border-2 border-gray-400 rounded-lg cursor-pointer max-h-12"
                                        >
                                            <div className="flex flex-col">
                                                <h3 className="font-bold">
                                                    {product.productName}
                                                </h3>
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute w-10 h-10 font-bold text-white bg-red-700 rounded-full -top-4 -right-4"
                                                onClick={() => {
                                                    setPromotion({
                                                        ...promotion,
                                                        products:
                                                            promotion.products.filter(
                                                                (id) =>
                                                                    id !==
                                                                    product._id
                                                            ),
                                                    });
                                                    setProductsTemp(
                                                        productsTemp.filter(
                                                            (p) =>
                                                                p._id !==
                                                                product._id
                                                        )
                                                    );
                                                }}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {type === "SPECIFIC PRODUCTS" && (
                            <div className="relative flex-grow w-full">
                                <TextField
                                    label="Search products"
                                    variant="outlined"
                                    className="w-full"
                                    value={text}
                                    onChange={handleTextChange}
                                    onFocus={() => setIsSearch(true)}
                                    autoComplete="off"
                                />
                                {isSearch && (
                                    <div
                                        className="absolute gap-4 top-12 left-0 w-full bg-white z-10 h-[150px] overflow-y-scroll border border-gray-300 rounded-md p-4"
                                        style={{ zIndex: 10 }}
                                    >
                                        {loading ? (
                                            <div className="w-10 h-10 mx-auto border-4 border-t-0 rounded-full animate-spin"></div>
                                        ) : data.length > 0 ? (
                                            data
                                                .filter(
                                                    (product) =>
                                                        !promotion.products.some(
                                                            (selected) =>
                                                                selected ===
                                                                product._id
                                                        )
                                                )
                                                .map((product) => (
                                                    <div
                                                        key={product._id}
                                                        className="flex items-center gap-4 border-b cursor-pointer "
                                                        onClick={() => {
                                                            setText("");
                                                            setPromotion({
                                                                ...promotion,
                                                                products: [
                                                                    ...promotion.products,
                                                                    product._id,
                                                                ],
                                                            });
                                                            setProductsTemp([
                                                                ...productsTemp,
                                                                product,
                                                            ]);
                                                            setIsSearch(false);
                                                            console.log(
                                                                promotion
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                product
                                                                    .productImages[0]
                                                            }
                                                            alt={product.name}
                                                            className="object-cover w-16 h-16 rounded-md"
                                                        />
                                                        <div className="flex flex-col">
                                                            <h3 className="font-bold">
                                                                {
                                                                    product.productName
                                                                }
                                                            </h3>
                                                            <p className="font-bold text-green-600">
                                                                {
                                                                    product.selling
                                                                }
                                                                $
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>No product found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {type === "SPECIFIC CATEGORIES" &&
                            categories.length > 0 && (
                                <div className="flex flex-wrap gap-8">
                                    {categories.map((category) => (
                                        <div
                                            key={category._id}
                                            className="flex gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="categories"
                                                id={category.value}
                                                value={category._id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setPromotion({
                                                            ...promotion,
                                                            categories: [
                                                                ...promotion.categories,
                                                                e.target.value,
                                                            ],
                                                        });
                                                    } else {
                                                        setPromotion({
                                                            ...promotion,
                                                            categories:
                                                                promotion.categories.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        e.target
                                                                            .value
                                                                ),
                                                        });
                                                    }
                                                }}
                                            />
                                            <label htmlFor={category.value}>
                                                {category.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {type === "SPECIFIC BRANDS" && brands.length > 0 && (
                            <div className="mt-5">
                                <h2 className="mb-2 text-xl font-bold">
                                    Select brand
                                </h2>
                                <div className="flex flex-wrap h-32 gap-4 overflow-y-scroll">
                                    {brands.map((brand) => (
                                        <div
                                            key={brand}
                                            className="flex gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="brands"
                                                id={brand}
                                                value={brand}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setPromotion({
                                                            ...promotion,
                                                            brands: [
                                                                ...promotion.brands,
                                                                e.target.value,
                                                            ],
                                                        });
                                                    } else {
                                                        setPromotion({
                                                            ...promotion,
                                                            brands: promotion.brands.filter(
                                                                (b) =>
                                                                    b !==
                                                                    e.target
                                                                        .value
                                                            ),
                                                        });
                                                    }
                                                }}
                                            />
                                            <label htmlFor={brand}>
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div
                            style={{
                                marginTop: "auto", // Đẩy nút xuống cuối cùng
                                zIndex: 1, // Nút ở lớp thấp hơn
                                width: "100%", // Full chiều rộng
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="w-full p-2"
                            >
                                Add promotion
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddPromotion;
