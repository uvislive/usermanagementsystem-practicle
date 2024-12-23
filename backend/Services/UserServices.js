const User = require('../models/User');
const Role = require('../models/Role');  // Import Role model
const ApiResponse = require('./../Common/ApiResponse');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// Create a new user
async function createUser(name, email, phone, password, roleId) {
    try {
        const roleObjectId = new mongoose.Types.ObjectId(roleId);
        const role = await Role.findById(roleObjectId);
        if (!role) {
            return ApiResponse.error('Role does not exist.', 400);
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return ApiResponse.error('User with this email already exists.', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = new User({ name, email, phone, password: hashedPassword, roleId });
        await user.save();
        return ApiResponse.success(user, 'User created successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Get all users

async function getAllUsers() {
    try {
        // Exclude the 'password' field by setting it to 0
        const users = await User.find()
            .select('-password') // Exclude the password field
            .populate('roleId', 'name'); // Populate role name for better response

        return ApiResponse.success(users, 'Users retrieved successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}


// Get a user by ID
async function getUserById(userId) {
    try {
        const userObjectId =  new mongoose.Types.ObjectId(userId);
        const user = await User.findById(userId).populate('roleId', 'name');
        if (!user) {
            return ApiResponse.error('User not found.', 404);
        }
        return ApiResponse.success(user, 'User retrieved successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Update a user by ID
async function updateUser(userId, name, email, phone,roleId) {
    try {
        const roleObjectId = new mongoose.Types.ObjectId(roleId._id);
        const userObjectId = new mongoose.Types.ObjectId(userId);
        // Check if the roleId exists
        const role = await Role.findById(roleObjectId);
        if (!role) {
            return ApiResponse.error('Role does not exist.', 400);
        }

        console.log("request arrived")
        // Check if the email already exists for another user
        const existingUser = await User.findOne({ email });
        console.log("existing user",existingUser)
        // if (existingUser && existingUser._id.toString() !== userObjectId) {
        //     return ApiResponse.error('Another user with this email already exists.', 400);
        // }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, roleId },
            { new: true }
        );

        console.log("request arrived 3")

        if (!updatedUser) {
            return ApiResponse.error('User not found.', 404);
        }
        return ApiResponse.success(updatedUser, 'User updated successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Delete a user by ID
async function deleteUser(userId) {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const deletedUser = await User.findByIdAndDelete(userObjectId);
        if (!deletedUser) {
            return ApiResponse.error('User not found.', 404);
        }
        return ApiResponse.success(deletedUser, 'User deleted successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

async function updatePassword(userId, currentPassword, newPassword, confirmPassword) {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        // Find the user by userId
        const user = await User.findById(userObjectId);
        if (!user) {
            return ApiResponse.error('User not found.', 404);
        }

        // Check if the current password is correct
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return ApiResponse.error('Current password is incorrect.', 400);
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return ApiResponse.error('New password and confirm password do not match.', 400);
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        // Check if the new password is the same as the current password
        if (isSamePassword) {
            return ApiResponse.error('New password cannot be the same as the current password.', 400);
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        return ApiResponse.success(user, 'Password updated successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updatePassword,
};
