import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";

const { createBrowserRouter } = require("react-router-dom");
const { default: App } = require("../App");
const { default: Home } = require("../pages/Home");

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
        ],
    },
]);

export default router;
