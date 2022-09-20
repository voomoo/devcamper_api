const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc Register User
//@route POST /api/v1/auth/register
//@access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    //create user
    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});

//@desc Login User
//@route POST /api/v1/auth/login
//@access PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate Email and Password
    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide an email and password", 400)
        );
    }

    //Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse("Invalid Credentials", 401));
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse("Invalid Credentials", 401));
    }

    //create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
});
