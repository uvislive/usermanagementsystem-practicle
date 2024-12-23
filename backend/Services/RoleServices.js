const Role = require('../models/Role');
const ApiResponse = require('./../Common/ApiResponse');
const User = require('../models/User');
const mongoose = require('mongoose');

// Create a new role
async function createRole(name) {
    try {
        // Check if the role name already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return ApiResponse.error('Role with this name already exists.', 400);
        }

        // Create a new role
        const role = new Role({ name });
        await role.save();
        return ApiResponse.success(role, 'Role created successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Get all roles
async function getAllRoles() {
    try {
        const roles = await Role.find();
        return ApiResponse.success(roles, 'Roles retrieved successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Get a role by ID
async function getRoleById(roleId) {
    try {
        const roleObjectId = new mongoose.Types.ObjectId(roleId);
        const role = await Role.findById(roleObjectId);
        if (!role) {
            return ApiResponse.error('Role not found.', 404);
        }
        return ApiResponse.success(role, 'Role retrieved successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Update a role by ID
async function updateRole(roleId, name) {
    try {
        const roleObjectId = new mongoose.Types.ObjectId(roleId);
        // Check if the new role name already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole && existingRole._id.toString() !== roleObjectId) {
            return ApiResponse.error('Another role with this name already exists.', 400);
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { name },
            { new: true }
        );

        if (!updatedRole) {
            return ApiResponse.error('Role not found.', 404);
        }
        return ApiResponse.success(updatedRole, 'Role updated successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}

// Delete a role by ID
async function deleteRole(roleId) {
    try {
        const roleObjectId = new mongoose.Types.ObjectId(roleId);
        
        const userWithRole = await User.findOne({ roleId: roleObjectId });
        if (userWithRole) {
            return ApiResponse.error('Role cannot be deleted because it is assigned to a user.', 400);
        }
        
        const deletedRole = await Role.findByIdAndDelete(roleObjectId);
        if (!deletedRole) {
            return ApiResponse.error('Role not found.', 404);
        }
        return ApiResponse.success(deletedRole, 'Role deleted successfully');
    } catch (error) {
        return ApiResponse.error(error.message, 500);
    }
}


module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};
