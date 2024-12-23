const userSubAdminService = require('../services/UserSubAdminServices');
const ApiResponse = require('../Common/ApiResponse');

// Get all roles
async function getAllUsers(req, res) {
    try {
        const { subAdminRoleId } = req.params;
        const response = await userSubAdminService.getUsersMappedToSubAdmin(subAdminRoleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Get a role by ID
async function getUserById(req, res) {
    const { userId, subAdminRoleId} = req.params;
    try {
        const response = await userSubAdminService.getUserAssignedToSubAdminById(userId, subAdminRoleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

async function updateUser(req, res) {
    const { userId, subAdminRoleId } = req.params; // Extract userId from the URL parameter
    const { name, email, phone, password } = req.body; // Extract necessary data from the request body

    // Prepare the data to be updated
    const updateData = { name, email, phone, password };

    try {
        // Call the service function to update the user
        const response = await userSubAdminService.updateUserAssignedToSubAdmin(userId, subAdminRoleId, updateData);

        // Return the response from the service layer
        return res.status(response.statusCode).json(response);
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json(ApiResponse.error(error.message));
    }
}


// Delete a role by ID
async function deleteUser(req, res) {
    const { userId,subAdminRoleId } = req.params;
    try {
        const response = await userSubAdminService.deleteUserAssignedToSubAdmin(userId, subAdminRoleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};