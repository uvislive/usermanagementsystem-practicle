const UserService = require('../services/userServices');
const ApiResponse = require('../Common/ApiResponse');
const UserSubAdminService = require('../services/UserSubAdminServices');

// Create a new role
async function createUser(req, res) {
    console.log("req.done")
    const { name, email, phone, password, roleId } = req.body;
    try {
        const response = await UserService.createUser(name, email, phone, password, roleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Get all roles
async function getAllUsers(req, res) {
    try {
        const response = await UserService.getAllUsers();
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Get a role by ID
async function getUserById(req, res) {
    const { userId } = req.params;
    console.log(userId,"userid");
    try {
        const response = await UserService.getUserById(userId);
        console.log(response,"response");

        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Update a role by ID
async function updateUser(req, res) {
    const { userId } = req.params;
    const { name, email, phone, roleId } = req.body;
    console.log("req.body",req.body);
    console.log("userid",userId)
    try {
        const response = await UserService.updateUser(userId, name, email, phone, roleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Delete a role by ID
async function deleteUser(req, res) {
    const { userId } = req.params;
    try {
        const response = await UserService.deleteUser(userId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

async function updatePassword(req, res) {
    const { userId } = req.params;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    try {
        const response = await UserService.updatePassword(userId, currentPassword, newPassword, confirmPassword);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

async function assignUserToSubAdmin(req, res) {
    const { userId, subAdminId } = req.body;
    try {
        const response = await UserSubAdminService.assignUserToSubAdmin(userId, subAdminId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updatePassword,
    assignUserToSubAdmin,
};
