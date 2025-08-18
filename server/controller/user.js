const user = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    console.log("REQ BODY:", req.body); // log để debug

    const { email, password, firstname, lastname } = req.body;

    // Kiểm tra input
    if (!email || !password || !lastname || !firstname) {
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        });
    }

    try {
        const response = await user.create(req.body);
        return res.status(200).json({
            success: response ? true : false,
            response
        });
    } catch (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
            success: false,
            mes: "Database error",
            err: err.message
        });
    }
});

module.exports = { register };
