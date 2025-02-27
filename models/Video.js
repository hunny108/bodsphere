const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    subscriptionType: { type: String, enum: ['Free', 'Paid'], required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
