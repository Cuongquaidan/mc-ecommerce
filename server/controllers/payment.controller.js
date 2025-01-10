// async function createVNPAYUrl(req, res) {
//     var ipAddr =
//         req.headers["x-forwarded-for"] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     var tmnCode = process.env.vnp_TmnCode;
//     var secretKey = process.env.vnp_HashSecret;
//     var vnpUrl = process.env.vnp_Url;
//     var returnUrl = process.env.vnp_ReturnUrl;

//     const dayjs = require("dayjs");

//     const createDate = dayjs().format("YYYYMMDDHHmmss");
//     const orderId = dayjs().format("HHmmss");
//     var amount = req.body.amount;
//     var bankCode = req.body.bankCode;

//     var orderInfo = req.body.orderDescription;
//     var orderType = req.body.orderType;
//     var locale = req.body.language;
//     if (locale === null || locale === "") {
//         locale = "vn";
//     }
//     var currCode = "VND";
//     var vnp_Params = {};
//     vnp_Params["vnp_Version"] = "2.1.0";
//     vnp_Params["vnp_Command"] = "pay";
//     vnp_Params["vnp_TmnCode"] = tmnCode;
//     // vnp_Params['vnp_Merchant'] = ''
//     vnp_Params["vnp_Locale"] = locale;
//     vnp_Params["vnp_CurrCode"] = currCode;
//     vnp_Params["vnp_TxnRef"] = orderId;
//     vnp_Params["vnp_OrderInfo"] = orderInfo;
//     vnp_Params["vnp_OrderType"] = orderType;
//     vnp_Params["vnp_Amount"] = amount * 100;
//     vnp_Params["vnp_ReturnUrl"] = returnUrl;
//     vnp_Params["vnp_IpAddr"] = ipAddr;
//     vnp_Params["vnp_CreateDate"] = createDate;
//     if (bankCode !== null && bankCode !== "") {
//         vnp_Params["vnp_BankCode"] = bankCode;
//     }

//     vnp_Params = sortObject(vnp_Params);

//     var querystring = require("qs");
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
//     vnp_Params["vnp_SecureHash"] = signed;
//     vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
//     console.log(vnpUrl);
//     res.redirect(vnpUrl);
// }
// async function vnpayReturn(req, res) {
//     var vnp_Params = req.query;

//     var secureHash = vnp_Params["vnp_SecureHash"];

//     delete vnp_Params["vnp_SecureHash"];
//     delete vnp_Params["vnp_SecureHashType"];

//     vnp_Params = sortObject(vnp_Params);

//     var tmnCode = process.env.vnp_TmnCode;
//     var secretKey = process.env.vnp_HashSecret;

//     var querystring = require("qs");
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     if (secureHash === signed) {
//         //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

//         res.json("success", { code: vnp_Params["vnp_ResponseCode"] });
//     } else {
//         res.json("success", { code: "97" });
//     }
// }

// async function vnpayIPN(req, res) {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params["vnp_SecureHash"];

//     delete vnp_Params["vnp_SecureHash"];
//     delete vnp_Params["vnp_SecureHashType"];

//     vnp_Params = sortObject(vnp_Params);
//     var config = require("config");
//     var secretKey = process.env.vnp_HashSecret;
//     var querystring = require("qs");
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     if (secureHash === signed) {
//         var orderId = vnp_Params["vnp_TxnRef"];
//         var rspCode = vnp_Params["vnp_ResponseCode"];
//         //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//         res.status(200).json({ RspCode: "00", Message: "success" });
//     } else {
//         res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
//     }
// }
// function sortObject(obj) {
//     const sortedKeys = Object.keys(obj).sort();
//     const sortedObj = {};
//     sortedKeys.forEach((key) => {
//         sortedObj[key] = obj[key];
//     });
//     return sortedObj;
// }
// module.exports = {
//     createVNPAYUrl,
//     vnpayReturn,
//     vnpayIPN,
// };
