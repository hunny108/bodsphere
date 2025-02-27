const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    about: { type: String },
    profileImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
