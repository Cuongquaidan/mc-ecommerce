import { toast } from "react-toastify";
import SUMMARY_API from "../common";

const addToCart = async (e, id, quantity = 1, fetchCartCallback) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await fetch(SUMMARY_API.addToCart.url, {
            method: SUMMARY_API.addToCart.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: id, quantity }),
        });

        const result = await response.json();

        if (result.success) {
            toast.success(result.message);

            // Gọi callback để fetch lại giỏ hàng
            if (fetchCartCallback) {
                await fetchCartCallback();
            }
        } else {
            toast.error(result.message);
        }

        return result;
    } catch (error) {
        toast.error("Failed to add to cart.");
        console.error(error);
    }
};

export default addToCart;
