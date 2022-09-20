const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc Register User
//@route POST /api/v1/auth/register
//@access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true });
});
