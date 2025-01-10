const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const CookieParser = require("cookie-parser");
const connect = require("./database/config");
dotenv.config();
const port = process.env.PORT || 8080;
const router = require("./routes/index");
const promotionController = require("./controllers/promotion.controller");
const promotionDetailController = require("./controllers/promotionDetail.controller");
var path = require("path");

const { CronJob } = require("cron");

const app = express();
app.use(CookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
// const job = CronJob.from({
//     cronTime: "* * * * * *",
//     onTick: function () {
//         promotionController.checkExpiredPromotion();
//         promotionDetailController.removeDetailsExp();
//     },
//     start: true,
//     timeZone: "Asia/Ho_Chi_Minh",
// });
// job.start();

app.use("/api/v1", router);
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
