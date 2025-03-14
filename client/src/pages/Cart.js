import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContextGlobal } from "../context";
import SUMMARY_API from "../common";
import { Modal, Button, Typography, Box } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import checkPromotion from "../helpers/checkPromotion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import paymentMethods from "../common/paymentMethods";
import groupProductByBrand from "../helpers/groupProductByBrand";

import { FaRegSquareCheck } from "react-icons/fa6";
import ungroupProductBrand from "../helpers/ungroupProductBrand";
import createOrder from "../helpers/createOrder";
import { setCurrentCartOrder } from "../store/cartSlice";
import { useTranslation} from "react-i18next"
const Cart = () => {
    const {t} = useTranslation();
    const cartOrder = useSelector((state) => state?.cart?.cartOrder); // Lấy giỏ hàng từ Redux
    console.log(cartOrder);
    const [groups, setGroups] = useState([]);
    const [groupsSelected, setGroupsSelected] = useState([]);
    const cart = useSelector((state) => state?.cart?.cart); // Lấy giỏ hàng từ Redux
    const user = useSelector((state) => state?.user?.user);
    const productsSoldOut = groupProductByBrand(
        cart.products.filter((product) => product.product.stock === 0)
    );
    console.log(productsSoldOut);
    const navigate = useNavigate();
    const { fetchGetCart } = useContextGlobal(); // Lấy hàm fetchGetCart từ Context

    const promotionDetails = useSelector((state) => state?.promotionDetails);
    const taxRate = 0.05; // Thuế 5%
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods.COD);
    const dispatch = useDispatch();
    const handleUpdateQuantity = async (productId, quantity) => {
        if (quantity === 0) {
            setModalContent({
                type: "remove",
                productId,
                message: "Are you sure you want to remove this product?",
            });
            setOpenModal(true);
            return;
        }

        try {
            console.log(quantity);
            const response = await fetch(`${SUMMARY_API.updateQuantity.url}`, {
                method: SUMMARY_API.updateQuantity.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId, quantity }),
            });
            const result = await response.json();
            if (result.success) {
                await fetchGetCart();
            }
            if (result.error) {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const handleRemoveProduct = (productId) => {
        setModalContent({
            type: "remove",
            productId,
            message: t("cart.confirm-message"),
        });
        setOpenModal(true);
    };

    const confirmAction = async () => {
        const { productId, type } = modalContent;

        if (type === "remove") {
            try {
                const response = await fetch(
                    `${SUMMARY_API.removeProduct.url}`,
                    {
                        method: SUMMARY_API.removeProduct.method,
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ productId }),
                    }
                );
                const result = await response.json();
                if (result.success) {
                    fetchGetCart();
                }
            } catch (error) {
                console.error("Failed to remove product:", error);
            }
        } else if (type === "checkout") {
            navigate("/my-profile");
        }

        setOpenModal(false); // Đóng modal
    };

    const cancelAction = () => {
        setOpenModal(false); // Đóng modal
    };

    const calculateTotal = () => {
        if (!groupsSelected || !groupsSelected.products?.length === 0) return 0;

        const ungrouped = ungroupProductBrand(groupsSelected);

        const subtotal = ungrouped.reduce((sum, item) => {
            const promotion = checkPromotion(promotionDetails, item.product);

            if (promotion) {
                const discountedPrice = (
                    item.product.selling - promotion.discount
                ).toFixed(2);
                return sum + discountedPrice * item.quantity;
            } else {
                return sum + item.product.selling * item.quantity;
            }
        }, 0);
        const tax = subtotal * taxRate;
        return parseInt(subtotal + tax) * 25000; // Tổng cộng bao gồm thuế
    };

    const handleCheckout = async () => {
        try {
            if (!user.address || !user.phone) {
                setModalContent({
                    type: "checkout",
                    message:
                        "Please update your address and phone number before checkout.",
                });
                setOpenModal(true);
                return;
            }
            if (paymentMethod === paymentMethods.COD) {
                const result = createOrder(
                    {
                        phone: user.phone,
                        address: user.address,
                        tax: 0.05,
                        subtotal: ((calculateTotal() / 25000) * 100) / 105,
                        total: calculateTotal(),
                        orderDetails: ungroupProductBrand(groupsSelected).map(
                            (item) => ({
                                product: item.product._id,
                                quantity: item.quantity,
                                selling: item.product.selling,
                                sellingPriceAfterPromo: (() => {
                                    const promotion = checkPromotion(
                                        promotionDetails,
                                        item.product
                                    );
                                    if (promotion) {
                                        return (
                                            item.product.selling -
                                            promotion.discount
                                        );
                                    } else {
                                        return item.product.selling;
                                    }
                                })(),
                            })
                        ),
                    },
                    fetchGetCart
                );
                if (result) {
                    navigate("/");
                } else {
                    toast.error("Order failed");
                }
            } else if (paymentMethod === paymentMethods.VNPAY) {
                dispatch(
                    setCurrentCartOrder({
                        phone: user.phone,
                        address: user.address,
                        tax: 0.05,
                        subtotal: ((calculateTotal() / 25000) * 100) / 105,
                        total: calculateTotal(),
                        paymentMethod: paymentMethods.VNPAY,
                        orderDetails: ungroupProductBrand(groupsSelected).map(
                            (item) => ({
                                product: item.product._id,
                                quantity: item.quantity,
                                selling: item.product.selling,
                                sellingPriceAfterPromo: (() => {
                                    const promotion = checkPromotion(
                                        promotionDetails,
                                        item.product
                                    );
                                    if (promotion) {
                                        return (
                                            item.product.selling -
                                            promotion.discount
                                        );
                                    } else {
                                        return item.product.selling;
                                    }
                                })(),
                            })
                        ),
                    })
                );
                console.log(cartOrder);

                const response = await fetch(
                    `${SUMMARY_API.createVNPAYUrl.url}`,
                    {
                        method: SUMMARY_API.createVNPAYUrl.method,
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            amount: calculateTotal(),
                            orderDescription: "Payment for products",
                            orderType: "other",
                        }),
                    }
                );
                const result = await response.json();
                if (result.success) {
                    window.location.href = result.data;
                }
            }
        } catch (error) {
            console.error("Failed to create VNPAY URL:", error);
        }
    };

    const handleCheckBrand = (brand) => {
        if (groupsSelected.some((item) => item.brand === brand)) {
            const groupSelectedWithNoBrand = groupsSelected.filter(
                (item) => item.brand !== brand
            );
            if (!checkAllProductOfBrand(brand)) {
                setGroupsSelected([
                    ...groupSelectedWithNoBrand,
                    groups.find((group) => group.brand === brand),
                ]);
            } else {
                setGroupsSelected(
                    groupsSelected.map((item) =>
                        item.brand === brand ? { ...item, products: [] } : item
                    )
                );
            }
        } else {
            setGroupsSelected([
                ...groupsSelected,
                groups.find((item) => item.brand === brand),
            ]);
        }
    };
    const handleCheckItem = (productId, brand) => {
        const groupSelectedCheck = groupsSelected.find(
            (item) => item.brand === brand
        );
        let groupSelectedProducts = groupSelectedCheck.products;
        if (groupSelectedProducts.some((item) => item._id === productId)) {
            groupSelectedProducts = groupSelectedProducts.filter(
                (item) => item._id !== productId
            );
        } else {
            groupSelectedProducts = [
                ...groupSelectedProducts,
                cart.products.find((item) => item._id === productId),
            ];
        }
        const newGroupsSelected = groupsSelected.map((item) =>
            item.brand === brand
                ? { ...item, products: groupSelectedProducts }
                : item
        );
        setGroupsSelected(newGroupsSelected);
        console.log(ungroupProductBrand(newGroupsSelected));
    };

    const checkAllProductOfBrand = (brand) => {
        const groupBrand = groups.find((item) => item.brand === brand);
        const groupSelected = groupsSelected.find(
            (item) => item.brand === brand
        );

        if (!groupBrand || !groupSelected) {
            return false; // Hoặc giá trị mặc định bạn mong muốn
        }

        if (groupBrand.products?.length === groupSelected.products?.length) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (cart && cart.products) {
            setGroups(groupProductByBrand(cart.products));
            setGroupsSelected(
                groupProductByBrand(
                    cart.products.filter((product) => product.product.stock > 0)
                )
            );
        }
    }, [cart]);
    return (
        <div className="container p-4 mx-auto">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Danh sách sản phẩm */}
                <div className="col-span-2">
                    {groups && groups.length > 0 ? (
                        groups.map((group) => (
                            <div
                                className="border-b-2 border-gray-300"
                                key={group.brand}
                            >
                                <div className="flex items-center gap-4 p-2">
                                    <h2 className="text-2xl italic font-bold">
                                        {group.brand}
                                    </h2>
                                    <button
                                        className="relative"
                                        onClick={() =>
                                            handleCheckBrand(group.brand)
                                        }
                                        disabled={productsSoldOut.some(
                                            (groupSO) =>
                                                groupSO.brand === group.brand
                                        )}
                                    >
                                        {checkAllProductOfBrand(group.brand) ? (
                                            <FaRegSquareCheck
                                                size={32}
                                                className="text-green-600"
                                            />
                                        ) : (
                                            <div className="w-[28px] h-[28px] mr-4 rounded-sm border-4 border-black"></div>
                                        )}
                                    </button>
                                </div>
                                {group.products.map((item) => (
                                    <div
                                        key={item._id}
                                        className="relative flex items-center justify-between p-4 overflow-hidden border-b"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="relative w-8 h-4 "
                                                disabled={productsSoldOut.some(
                                                    (groupSO) =>
                                                        groupSO.products.some(
                                                            (product) =>
                                                                product._id ===
                                                                item._id
                                                        )
                                                )}
                                                onClick={() =>
                                                    handleCheckItem(
                                                        item._id,
                                                        group.brand
                                                    )
                                                }
                                            >
                                                {groupsSelected.some(
                                                    (groupSelected) =>
                                                        groupSelected.products.some(
                                                            (product) =>
                                                                product._id ===
                                                                item._id
                                                        )
                                                ) ? (
                                                    <FaRegSquareCheck
                                                        size={26}
                                                        className="absolute top-0 left-0 mr-4 text-green-600"
                                                    />
                                                ) : (
                                                    <div className="w-[22px] h-[22px] mr-4 absolute top-0 left-0 rounded-sm border-2 border-black"></div>
                                                )}
                                            </button>
                                            <img
                                                src={
                                                    item.product
                                                        .productImages[0]
                                                }
                                                alt={item.product.productName}
                                                className="object-cover w-16 h-16 rounded"
                                            />
                                            <div className="ml-4">
                                                <p className="flex gap-4 font-bold">
                                                    {item.product.productName}
                                                    {checkPromotion(
                                                        promotionDetails,
                                                        item.product
                                                    ) && (
                                                        <div className="left-0 flex items-center justify-center w-10 h-6 text-white bg-red-500 top-4">
                                                            <p className="text-center">
                                                                {t("sale")}
                                                            </p>
                                                        </div>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item.product.description}
                                                </p>
                                                {(() => {
                                                    const promotion =
                                                        checkPromotion(
                                                            promotionDetails,
                                                            item.product
                                                        );

                                                    if (promotion) {
                                                        const discountedPrice =
                                                            (
                                                                item.product
                                                                    .selling -
                                                                promotion.discount
                                                            ).toFixed(2);

                                                        return (
                                                            <div className="flex gap-3">
                                                                <p className="font-medium text-green-600">
                                                                    {discountedPrice.toLocaleString()}
                                                                    $
                                                                </p>
                                                                <p className="line-through text-slate-500">
                                                                    {item.product.selling
                                                                        .toFixed(
                                                                            2
                                                                        )
                                                                        .toLocaleString()}
                                                                    $
                                                                </p>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <p className="font-medium text-green-600">
                                                                {item.product.selling.toLocaleString()}
                                                                $
                                                            </p>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {productsSoldOut.some((groupSO) =>
                                                groupSO.products.some(
                                                    (product) =>
                                                        product._id === item._id
                                                )
                                            ) ? (
                                                <p className="text-red-600">
                                                    {t("sold-out")}         
                                                </p>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        className="px-2 py-1 border rounded hover:bg-gray-200"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.product
                                                                    ._id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity <= 1
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="px-2 py-1 border rounded hover:bg-gray-200"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.product
                                                                    ._id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                            <button
                                                className="p-2 ml-4 text-red-600 bg-red-100 rounded-full"
                                                onClick={() =>
                                                    handleRemoveProduct(
                                                        item.product._id
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>{t("cart.empty-message")}</p>
                    )}
                </div>

                {/* Thanh toán */}
                <div className="p-4 border rounded">
                    <h2 className="mb-4 text-lg font-bold">{t("cart.summary")}</h2>
                    {cart && cart.products.length > 0 && (
                        <>
                            <div className="flex justify-between mb-2">
                                <span>{t("cart.subtotal")}:</span>
                                <span>
                                    $
                                    {ungroupProductBrand(groupsSelected)
                                        .reduce(
                                            (sum, item) => {
                                                const promotion =
                                                    checkPromotion(
                                                        promotionDetails,
                                                        item.product
                                                    );

                                                if (promotion) {
                                                    const discountedPrice = (
                                                        item.product.selling -
                                                        promotion.discount
                                                    ).toFixed(2);
                                                    return (
                                                        sum +
                                                        discountedPrice *
                                                            item.quantity
                                                    );
                                                } else {
                                                    return (
                                                        sum +
                                                        item.product.selling *
                                                            item.quantity
                                                    );
                                                }
                                            },

                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>{t("cart.tax")} (5%):</span>
                                <span>
                                    $
                                    {(
                                        ungroupProductBrand(
                                            groupsSelected
                                        ).reduce((sum, item) => {
                                            const promotion = checkPromotion(
                                                promotionDetails,
                                                item.product
                                            );

                                            if (promotion) {
                                                const discountedPrice = (
                                                    item.product.selling -
                                                    promotion.discount
                                                ).toFixed(2);
                                                return (
                                                    sum +
                                                    discountedPrice *
                                                        item.quantity
                                                );
                                            } else {
                                                return (
                                                    sum +
                                                    item.product.selling *
                                                        item.quantity
                                                );
                                            }
                                        }, 0) * taxRate
                                    ).toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between mb-4 font-bold">
                                <span>{t("cart.total")}:</span>
                                <span>{calculateTotal().toFixed(2)}VND</span>
                            </div>

                            <div className="flex flex-col gap-2 mb-4">
                                <select
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    className="p-2 border border-green-700 outline-none dark:bg-neutral-500 dark:text-neutral-100"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                >
                                    <option value={paymentMethods.COD} className="p-2">
                                        COD
                                    </option>
                                    <option value={paymentMethods.VNPAY} className="p-2">
                                        VNPay
                                    </option>
                                </select>
                            </div>

                            <button
                                className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                onClick={handleCheckout}
                            >
                                {t("cart.order")}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal open={openModal} onClose={cancelAction}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" className="mb-4">
                        {modalContent.message}
                    </Typography>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={confirmAction}
                            className="mr-2"
                        >
                            {t("cart.confirm")}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={cancelAction}
                        >
                            {t("cart.cancel")}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Cart;
