const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                error: true,
                success: false,
                data: [],
                message: "Please login",
            });
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(401).json({
                    error: true,
                    success: false,
                    data: [],
                    message: "Unauthorized",
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: [],
            message: error.message || error,
        });
    }
}

module.exports = { authToken };
