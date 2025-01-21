const orderDetailController = require("../controllers/orderDetail.controller");
const router = require("express").Router();
const { authToken } = require("../middlewares/authToken");
router.get(
    "/getByOrderId/:orderId",
    authToken,
    orderDetailController.getOrderDetailsByOrderId
);
router.get(
    "/getByMonthAndYear",
    authToken,
    orderDetailController.getOrderDetailsByMonthAndYear
);

module.exports = router;
