const RoleService = require('../services/roleServices');
const ApiResponse = require('../Common/ApiResponse');

// Create a new role
async function createRole(req, res) {
    const { name } = req.body;
    try {
        const response = await RoleService.createRole(name);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Get all roles
async function getAllRoles(req, res) {
    try {
        const response = await RoleService.getAllRoles();
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Get a role by ID
async function getRoleById(req, res) {
    const { roleId } = req.params;
    try {
        const response = await RoleService.getRoleById(roleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Update a role by ID
async function updateRole(req, res) {
    const { roleId } = req.params;
    const { name } = req.body;
    try {
        const response = await RoleService.updateRole(roleId, name);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

// Delete a role by ID
async function deleteRole(req, res) {
    const { roleId } = req.params;
    try {
        const response = await RoleService.deleteRole(roleId);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};
