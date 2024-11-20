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
        ],
    },
]);

export default router;
