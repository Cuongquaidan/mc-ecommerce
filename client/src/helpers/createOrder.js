import SUMMARY_API from "../common";
import { toast } from "react-toastify";

const createOrder = async (order, getCart) => {
    try {
        const response = await fetch(SUMMARY_API.createOrder.url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        const result = await response.json();
        if (result.success) {
            //  remove items ordered from cart
            const productIds = order.orderDetails.map(
                (product) => product.product
            );
            const responseRemoveItemsFromCart = await fetch(
                SUMMARY_API.removeItemsFromCart.url,
                {
                    method: SUMMARY_API.removeItemsFromCart.method,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productIds }),
                }
            );
            const resultRemoveItemsFromCart =
                await responseRemoveItemsFromCart.json();
            if (resultRemoveItemsFromCart.success) {
                toast.success(result.message);
                await getCart();
                return true;
            } else {
                toast.error(resultRemoveItemsFromCart.message);
                return false;
            }
        } else {
            toast.error(result.message);
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default createOrder;
