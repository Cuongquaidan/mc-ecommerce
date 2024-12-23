import AdminPanel from "../pages/AdminPanel";
import AllProducts from "../pages/AllProducts";
import AllUsers from "../pages/AllUsers";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Home from "../pages/Home";
import CategoryProduct from "../pages/CategoryProduct";
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "product-category/:category",
                element: <CategoryProduct />,
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    },
                ],
            },
        ],
    },
]);

export default router;
