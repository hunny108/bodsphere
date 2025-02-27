import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    subscriptionType: { type: String, enum: ['Free', 'Paid'], required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
export default Video;