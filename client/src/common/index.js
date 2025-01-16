const API_PREFIX = "http://localhost:8080/api/v1";

const SUMMARY_API = {
    register: {
        url: `${API_PREFIX}/users/register`,
        method: "POST",
    },
    login: {
        url: `${API_PREFIX}/users/login`,
        method: "POST",
    },
    logout: {
        url: `${API_PREFIX}/users/logout`,
        method: "GET",
    },
    getInfo: {
        url: `${API_PREFIX}/users/get-info`,
        method: "GET",
    },
    getAllUsers: {
        url: `${API_PREFIX}/users/get-all`,
        method: "GET",
    },
    updateUserRole: {
        url: `${API_PREFIX}/users/update`,
        method: "PATCH",
    },
    addProduct: {
        url: `${API_PREFIX}/products/add-product`,
        method: "POST",
    },
    getAllProducts: {
        url: `${API_PREFIX}/products/get-all`,
        method: "GET",
    },
    updateProduct: {
        url: `${API_PREFIX}/products/update`,
        method: "PATCH",
    },
    productCategory: {
        url: `${API_PREFIX}/products/getProductCategory`,
        method: "GET",
    },
    categoryWiseProduct: {
        url: `${API_PREFIX}/products/getCategoryWiseProduct`,
        method: "POST",
    },
    productDetails: {
        url: `${API_PREFIX}/products/getProductDetails`,
        method: "POST",
    },
    addToCart: {
        url: `${API_PREFIX}/cart/add-to-cart`,
        method: "POST",
    },
    getCart: {
        url: `${API_PREFIX}/cart/get-cart`,
        method: "GET",
    },
    updateQuantity: {
        url: `${API_PREFIX}/cart/update-quantity`,
        method: "PATCH",
    },
    removeProduct: {
        url: `${API_PREFIX}/cart/remove-product`,
        method: "PATCH",
    },
    searchProduct: {
        url: `${API_PREFIX}/products/search`,
        method: "GET",
    },
    filterProduct: {
        url: `${API_PREFIX}/products/filter`,
        method: "POST",
    },
    addCategory: {
        url: `${API_PREFIX}/categories/add-category`,
        method: "POST",
    },
    getAllCategories: {
        url: `${API_PREFIX}/categories/get-categories`,
        method: "GET",
    },
    addPromotion: {
        url: `${API_PREFIX}/promotions/add-promotion`,
        method: "POST",
    },
    getAllPromotions: {
        url: `${API_PREFIX}/promotions/get-all`,
        method: "GET",
    },
    getPromotion: {
        url: `${API_PREFIX}/promotions/get-promotion`,
        method: "GET",
    },
    getBrands: {
        url: `${API_PREFIX}/products/getBrands`,
        method: "GET",
    },
    getPromotionDetails: {
        url: `${API_PREFIX}/promotion-details/get-promotion-details`,
        method: "GET",
    },
    createVNPAYUrl: {
        url: `${API_PREFIX}/payment/create_payment_VNPAYUrl`,
        method: "POST",
    },
    vnpay_ipn: {
        url: `${API_PREFIX}/payment/vnpay_ipn`,
        method: "GET",
    },
    updateUserInfo: {
        url: `${API_PREFIX}/users/update-info`,
        method: "PATCH",
    },
    createOrder: {
        url: `${API_PREFIX}/orders/create`,
        method: "POST",
    },
    clearCart: {
        url: `${API_PREFIX}/cart/clear-cart`,
        method: "PATCH",
    },
    removeItemsFromCart: {
        url: `${API_PREFIX}/cart/remove-items`,
        method: "PATCH",
    },
    getOrders: {
        url: `${API_PREFIX}/orders/get`,
        method: "GET",
    },
};

export default SUMMARY_API;
