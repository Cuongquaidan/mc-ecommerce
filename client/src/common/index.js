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
};

export default SUMMARY_API;
