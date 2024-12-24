const express = require('express');
const roleController = require('../Controllers/roleController');
const router = express.Router();
const authGuard = require('../middleware/authGuard');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: The roles managing API
 */

/**
 * @swagger
 * path:
 *  /roles:
 *    post:
 *      summary: Create a new role
 *      tags: [Roles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the role
 *                  example: Admin
 *      responses:
 *        200:
 *          description: Role created successfully
 *        400:
 *          description: Bad request, role already exists
 *        500:
 *          description: Internal server error
 */
router.post('/',authGuard(['Admin']), roleController.createRole);

/**
 * @swagger
 * path:
 *  /roles:
 *    get:
 *      summary: Get all roles
 *      tags: [Roles]
 *      responses:
 *        200:
 *          description: Successfully retrieved all roles
 *        500:
 *          description: Internal server error
 */
router.get('/', authGuard(['Admin','Sub-Admin']),roleController.getAllRoles);

/**
 * @swagger
 * path:
 *  /roles/{roleId}:
 *    get:
 *      summary: Get a role by ID
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: roleId
 *          required: true
 *          description: The ID of the role
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Role retrieved successfully
 *        404:
 *          description: Role not found
 *        500:
 *          description: Internal server error
 */
router.get('/:roleId', authGuard(['Admin']),roleController.getRoleById);

/**
 * @swagger
 * path:
 *  /roles/{roleId}:
 *    put:
 *      summary: Update a role by ID
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: roleId
 *          required: true
 *          description: The ID of the role
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The new name of the role
 *                  example: SuperAdmin
 *      responses:
 *        200:
 *          description: Role updated successfully
 *        400:
 *          description: Bad request, role name conflict
 *        404:
 *          description: Role not found
 *        500:
 *          description: Internal server error
 */
router.put('/:roleId',authGuard(['Admin']), roleController.updateRole);

/**
 * @swagger
 * path:
 *  /roles/{roleId}:
 *    delete:
 *      summary: Delete a role by ID
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: roleId
 *          required: true
 *          description: The ID of the role
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Role deleted successfully
 *        404:
 *          description: Role not found
 *        500:
 *          description: Internal server error
 */
router.delete('/:roleId', authGuard(['Admin']),roleController.deleteRole);

module.exports = router;
