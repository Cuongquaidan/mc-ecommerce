const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./database/config");
dotenv.config();
const port = process.env.PORT || 8080;
const router = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
