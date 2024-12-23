const mongoose = require('mongoose');

// Define the schema for the User-SubAdmin relationship
const userSubAdminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    subAdminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model (SubAdmin)
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create a model using the schema
const UserSubAdmin = mongoose.model('UserSubAdmin', userSubAdminSchema);

module.exports = UserSubAdmin;
