const mongoose = require('mongoose');
const ApiResponse = require('../Common/ApiResponse');
const User = require('../models/User');
const Role = require('../models/Role');
const UserSubAdmin = require('../models/UserSubAdmin'); // Assuming the UserSubAdmin model is in this path

async function assignUserToSubAdmin(userId, subAdminId) {
    try {
        // Ensure both user and subadmin exist
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const subAdminObjectId = new mongoose.Types.ObjectId(subAdminId);

        const user = await User.findById(userObjectId);
        if (!user) {
            return ApiResponse.error('User does not exist.', 400);
        }

        const subAdmin = await User.findById(subAdminObjectId);
        if (!subAdmin) {
            return ApiResponse.error('Subadmin does not exist.', 400);
        }

        // Fetch the role based on user.roleId
        const userRole = await Role.findById(user.roleId);
        if (!userRole) {
            return ApiResponse.error('User role does not exist.', 400);
        }

        // Check if the user has the role 'User'
        if (userRole.name !== 'User') {
            return ApiResponse.error('The user must have the role of "User".', 400);
        }

        // Fetch the role of the subadmin
        const subAdminRole = await Role.findById(subAdmin.roleId);
        if (!subAdminRole) {
            return ApiResponse.error('Subadmin role does not exist.', 400);
        }

        // Check if the subadmin has the role 'subadmin'
        if (subAdminRole.name !== 'Sub-Admin') {
            return ApiResponse.error('The subadmin must have the role of "subadmin".', 400);
        }

        // Create the assignment (user assigned to subadmin)
        const assignment = new UserSubAdmin({
            userId: userObjectId,
            subAdminId: subAdminObjectId,
        });

        await assignment.save();
        return ApiResponse.success(assignment, 'User assigned to subadmin successfully.');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

async function getUsersMappedToSubAdmin(subAdminRoleId) {
    try {
        const subAdminObjectId = new mongoose.Types.ObjectId(subAdminRoleId);

        // Validate if the subadmin roleId exists and is valid
        const subAdminRole = await Role.findById(subAdminObjectId);
        if (!subAdminRole || subAdminRole.name !== 'Sub-Admin') {
            return ApiResponse.error('The provided roleId is not a valid subadmin.', 400);
        }

        // Get the users mapped to the given subadmin role ID
        const mappedUsers = await UserSubAdmin.find({ subAdminId: subAdminObjectId })
            .populate('userId') // Assuming the UserSubAdmin model maps userId to the User model
            .exec();

        console.log("mapped user",mappedUsers)
        if (mappedUsers.length === 0) {
            return ApiResponse.error('No users found for this subadmin.', 404);
        }

        // Extract userIds from mappedUsers
        const userIds = mappedUsers.map((assignment) => assignment.userId._id);

        // Fetch all users from the User table based on userIds
        const users = await User.find({ _id: { $in: userIds } });

        if (users.length === 0) {
            return ApiResponse.error('No users found in the database.', 404);
        }

        // Return the users mapped to this subadmin with full user details
        return ApiResponse.success(users, 'Users fetched successfully.');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Function to update user assigned to subadmin
async function updateUserAssignedToSubAdmin(userId, subAdminRoleId, updateData) {
    try {
        const subAdminObjectId = new mongoose.Types.ObjectId(subAdminRoleId);

        // Validate if the subadmin roleId exists and is valid
        const subAdminRole = await Role.findById(subAdminObjectId);
        if (!subAdminRole || subAdminRole.name !== 'Sub-Admin') {
            return ApiResponse.error('The provided roleId is not a valid subadmin.', 400);
        }

        // Ensure user is mapped to the given subadmin
        const userSubAdminMapping = await UserSubAdmin.findOne({
            userId: userId,
            subAdminId: subAdminObjectId
        });

        if (!userSubAdminMapping) {
            return ApiResponse.error('User is not assigned to this subadmin.', 400);
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        // Perform the update on the user
        const updatedUser = await User.findByIdAndUpdate(userObjectId, updateData, { new: true });

        if (!updatedUser) {
            return ApiResponse.error('User not found.', 404);
        }

        return ApiResponse.success(updatedUser, 'User updated successfully.');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

async function getUserAssignedToSubAdminById(userId, subAdminRoleId) {
    try {
        const subAdminObjectId = new mongoose.Types.ObjectId(subAdminRoleId);

        // Validate if the subadmin roleId exists and is valid
        const subAdminRole = await Role.findById(subAdminObjectId);
        if (!subAdminRole || subAdminRole.name !== 'Sub-Admin') {
            return ApiResponse.error('The provided roleId is not a valid subadmin.', 400);
        }

        // Ensure user is mapped to the given subadmin
        const userSubAdminMapping = await UserSubAdmin.findOne({
            userId: userId,
            subAdminId: subAdminObjectId
        });

        if (!userSubAdminMapping) {
            return ApiResponse.error('User is not assigned to this subadmin.', 400);
        }

         const userObjectId = new mongoose.Types.ObjectId(userObjectId);
        const user = await User.findById(userId).populate('roleId', 'name');

        if (!user) {
            return ApiResponse.error('User not found.', 404);
        }

        return ApiResponse.success(user, 'User updated successfully.');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Function to delete user assigned to subadmin
async function deleteUserAssignedToSubAdmin(userId, subAdminRoleId) {
    try {
        const subAdminObjectId = new mongoose.Types.ObjectId(subAdminRoleId);

        // Validate if the subadmin roleId exists and is valid
        const subAdminRole = await Role.findById(subAdminObjectId);
        if (!subAdminRole || subAdminRole.name !== 'Sub-Admin') {
            return ApiResponse.error('The provided roleId is not a valid subadmin.', 400);
        }

        // Ensure user is mapped to the given subadmin
        const userSubAdminMapping = await UserSubAdmin.findOne({
            userId: userId,
            subAdminId: subAdminObjectId
        });

        if (!userSubAdminMapping) {
            return ApiResponse.error('User is not assigned to this subadmin.', 400);
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        // Delete the user from the User table
        const deletedUser = await User.findByIdAndDelete(userObjectId);

        if (!deletedUser) {
            return ApiResponse.error('User not found.', 404);
        }

        // Optionally, you can also remove the mapping entry in UserSubAdmin
        await UserSubAdmin.deleteOne({ userId: userObjectId, subAdminId: subAdminObjectId });

        return ApiResponse.success(deletedUser, 'User deleted successfully.');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}


module.exports = { assignUserToSubAdmin,getUsersMappedToSubAdmin,
    updateUserAssignedToSubAdmin ,deleteUserAssignedToSubAdmin,
    getUserAssignedToSubAdminById};
