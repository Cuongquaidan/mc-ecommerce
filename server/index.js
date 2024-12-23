const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const CookieParser = require("cookie-parser");
const connect = require("./database/config");
dotenv.config();
const port = process.env.PORT || 8080;
const router = require("./routes/index");

const app = express();
app.use(CookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api/v1", router);
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
