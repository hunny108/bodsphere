import Joi from 'joi';
import Profile from '../models/profile.js';

class ProfileController {
    async createProfile(request, response, next) {
        console.log("🚀 ~ ProfileController ~ createProfile ~ request:", request.body);
        
        const validationSchema = Joi.object({
            name: Joi.string().trim().required(),
            about: Joi.string().trim().allow(''),
        });
    
        try {
            console.log("🚀 ~ ProfileController ~ createProfile ~ request.files:", request.files);
            let profileImage = request.files ? `/uploads/${request.files[0].filename}` : '';
    
            console.log("🚀 ~ ProfileController ~ createProfile ~ profileImage:", profileImage);
            const { name, about } = await validationSchema.validateAsync(request.body);
    
            const existingProfile = await Profile.findOne({ where: { userId: request.user.id } });
            
            if (existingProfile) {
                return response.status(400).json({ message: 'You already have a profile.' });
            }
    
            const profile = new Profile({
                userId: request.user.id,
                name,
                about,
                profileImage
            });
    
            await profile.save();
            return response.status(201).json(profile);
    
        } catch (error) {
            return next(error);
        }
    }

    async getProfile(request, response, next) {
        try {
            const profile = await Profile.findOne({ userId: request.user.id });
            if (!profile) return response.status(404).json({ message: 'Profile not found' });
            return response.json(profile);
        } catch (error) {
            return next(error);
        }
    }

    async updateProfile(request, response, next) {
        const validationSchema = Joi.object({
            name: Joi.string().trim().optional(),
            about: Joi.string().trim().allow(''),
        });
    
        try {
            const updates = await validationSchema.validateAsync(request.body);
            if (request.files) {
                updates.profileImage = `/uploads/${request.files[0].filename}`;
            }
            const profile = await Profile.findOneAndUpdate(
                { userId: request.user.id },
                { $set: updates },
                { new: true, runValidators: true }
            );
            if (!profile) {
                return response.status(404).json({ message: 'Profile not found' });
            }
    
            return response.json(profile);
        } catch (error) {
            return next(error);
        }
    }
    

    async deleteProfile(request, response, next) {
        try {
            const profile = await Profile.findOneAndDelete({ userId: request.user.id });
            if (!profile) return response.status(404).json({ message: 'Profile not found' });
            return response.json({ message: 'Profile deleted successfully' });
        } catch (error) {
            return next(error);
        }
    }
}

export default new ProfileController();
