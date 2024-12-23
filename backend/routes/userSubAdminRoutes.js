const express = require('express');
const userSubAdminController = require('../controllers/SubAdminController');
const router = express.Router();
const authGuard = require('../middleware/authGuard');

router.get('/:subAdminRoleId', authGuard(['Sub-Admin']),userSubAdminController.getAllUsers);
router.get('/:subAdminRoleId/:userId', authGuard(['Sub-Admin']),userSubAdminController.getUserById);
router.put('/:subAdminRoleId/:userId', authGuard(['Sub-Admin']),userSubAdminController.updateUser);
router.delete('/:userId/:subAdminRoleId', authGuard(['Sub-Admin']),userSubAdminController.deleteUser);

module.exports = router;
