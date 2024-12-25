import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useContextGlobal } from "../context";
import SUMMARY_API from "../common";
import { Modal, Button, Typography, Box } from "@mui/material";
import { FaTrash } from "react-icons/fa";
const Cart = () => {
    const cart = useSelector((state) => state.cart); // Lấy giỏ hàng từ Redux
    const { fetchGetCart } = useContextGlobal(); // Lấy hàm fetchGetCart từ Context
    const [promo, setPromo] = useState(0); // Khuyến mãi mặc định là 0
    const taxRate = 0.05; // Thuế 5%
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

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
                fetchGetCart();
            }
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const handleRemoveProduct = (productId) => {
        setModalContent({
            type: "remove",
            productId,
            message: "Are you sure you want to remove this product?",
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
        }

        setOpenModal(false); // Đóng modal
    };

    const cancelAction = () => {
        setOpenModal(false); // Đóng modal
    };

    const calculateTotal = () => {
        if (!cart || !cart.products) return 0;

        const subtotal = cart.products.reduce(
            (sum, item) => sum + item.product.selling * item.quantity,
            0
        );
        const tax = subtotal * taxRate;
        return subtotal + tax - promo;
    };

    return (
        <div className="container p-4 mx-auto">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Danh sách sản phẩm */}
                <div className="col-span-2">
                    {cart && cart.products.length > 0 ? (
                        cart.products.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between p-4 border-b"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.product.productImages[0]}
                                        alt={item.product.productName}
                                        className="object-cover w-16 h-16 rounded"
                                    />
                                    <div className="ml-4">
                                        <p className="font-bold">
                                            {item.product.productName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.product.description}
                                        </p>
                                        <p className="font-bold text-green-500">
                                            {item.product.selling}$
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 border rounded hover:bg-gray-200"
                                        onClick={() =>
                                            handleUpdateQuantity(
                                                item.product._id,
                                                item.quantity - 1
                                            )
                                        }
                                        disabled={item.quantity <= 1}
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
                                                item.product._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
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
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Thanh toán */}
                <div className="p-4 border rounded">
                    <h2 className="mb-4 text-lg font-bold">Summary</h2>
                    {cart && cart.products.length > 0 && (
                        <>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>
                                    $
                                    {cart.products
                                        .reduce(
                                            (sum, item) =>
                                                sum +
                                                item.product.selling *
                                                    item.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (5%):</span>
                                <span>
                                    $
                                    {(
                                        cart.products.reduce(
                                            (sum, item) =>
                                                sum +
                                                item.product.selling *
                                                    item.quantity,
                                            0
                                        ) * taxRate
                                    ).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Promo:</span>
                                <span>${promo.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4 font-bold">
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                Checkout
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
                            Confirm
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={cancelAction}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Cart;
