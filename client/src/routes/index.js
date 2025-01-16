import AdminPanel from "../pages/AdminPanel";
import AllProducts from "../pages/AllProducts";
import AllUsers from "../pages/AllUsers";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Home from "../pages/Home";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import AllPromotions from "../pages/AllPromotions";
import PromotionAllProduct from "../pages/PromotionAllProduct";
import PromotionSpecificProducts from "../pages/PromotionSpecificProducts";
import PromotionSpecificCategories from "../pages/PromotionSpecificCategories";
import PromotionSpecificBrands from "../pages/PromotionSpecificBrands";
import CheckoutResult from "../pages/CheckoutResult";
import MyProfile from "../pages/MyProfile";
import MyOrders from "../pages/MyOrders";
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
                path: "product-category",
                element: <CategoryProduct />,
            },
            {
                path: "product/:id",
                element: <ProductDetails></ProductDetails>,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "checkout/result",
                element: <CheckoutResult></CheckoutResult>,
            },
            {
                path: "my-profile",
                element: <MyProfile />,
            },
            {
                path: "my-orders",
                element: <MyOrders />,
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
                    {
                        path: "all-promotions",
                        element: <AllPromotions />,
                    },
                    {
                        path: "all-promotions/all-products",
                        element: <PromotionAllProduct />,
                    },
                    {
                        path: "all-promotions/specific-products",
                        element: <PromotionSpecificProducts />,
                    },
                    {
                        path: "all-promotions/specific-categories",
                        element: <PromotionSpecificCategories />,
                    },
                    {
                        path: "all-promotions/specific-brands",
                        element: <PromotionSpecificBrands />,
                    },
                ],
            },
        ],
    },
]);

export default router;
