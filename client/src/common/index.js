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
};

export default SUMMARY_API;
