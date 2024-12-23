const express = require('express');
const userController = require('../Controllers/UserController');
const router = express.Router();
const authGuard = require('../middleware/authGuard');

router.post('/signup', userController.createUser);
router.post('/', authGuard(['Admin']), userController.createUser);
router.post('/assign', authGuard(['Admin']), userController.assignUserToSubAdmin);
// here user permission is only for the showing record purpose 
router.get('/', authGuard(['Admin',"User"]),userController.getAllUsers);
router.get('/:userId', authGuard(['Admin',"User","Sub-Admin"]),userController.getUserById);
router.put('/:userId', authGuard(['Admin']), userController.updateUser);
router.delete('/:userId', authGuard(['Admin']),userController.deleteUser);
router.patch('/:userId', authGuard(['Admin','User','Sub-Admin']),userController.updatePassword);

module.exports = router;