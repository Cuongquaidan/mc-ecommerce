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
};

export default SUMMARY_API;
