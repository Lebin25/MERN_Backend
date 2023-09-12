const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModels');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');

//Create a User
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // Create a new User
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error('User Already Exists')
    }
});

//Login
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials")
    }
})

// Update a user
const updateUserById = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile
            }, {
            new: true,
        });
        res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }
})

// Get all user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error)
    }
});

// Get a single user
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id);
    try {
        const getUserById = await User.findById(id);
        res.json({
            getUserById,
        })
    } catch (error) {
        throw new Error(error)
    }
});

// Delete a single user
const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id);
    try {
        const deleteUserById = await User.findByIdAndDelete(id);
        res.json({
            deleteUserById,
        })
    } catch (error) {
        throw new Error(error)
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json(block);
    } catch (error) {
        throw new Error(error)
    }
})
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            });
        res.json({
            message: "User Unblocked",
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createUser,
    loginUserCtrl,
    getAllUser,
    getUserById,
    deleteUserById,
    updateUserById,
    blockUser,
    unblockUser
}