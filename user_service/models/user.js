import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    subscriptionType: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;