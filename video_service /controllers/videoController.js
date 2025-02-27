import Joi from 'joi';
import Video from '../models/video.js';
import UserService from '../servies/dbservices.js'

class VideoController {
    async uploadVideo(req, res, next) {
        console.log("🚀 ~ VideoController ~ uploadVideo ~ req:", req.user)
        const validationSchema = Joi.object({
            title: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            subscriptionType: Joi.string().valid('Free', 'Paid').required(),
        });
    
        try {
            if (req.user.role !== 'Admin') {
                throw new Error("Unauthorized: Only admins can upload videos.");
            }
    
            const { title, description, subscriptionType } = await validationSchema.validateAsync(req.body);
    
            if (!req.files) {
                throw new Error("Video file is required.");
            }
    
            const video = new Video({
                uploadedBy: req.user.id,
                title,
                description,
                subscriptionType,
                url: `/uploads/${req.files[0].filename}`,
                thumbnail: req.body.thumbnail || '',
            });
    
            await video.save();
            return res.status(201).json(video);
        } catch (error) {
            return next(error);
        }
    }
    

    async getVideos(req, res, next) {
        const validationSchema = Joi.object({
            subscriptionType: Joi.string().valid('Free', 'Paid').optional(),
        });
        console.log("🚀 ~ VideoController ~ getVideos ~ req:", req.headers);
    
        try {
            const { subscriptionType } = await validationSchema.validateAsync(req.query);
            const filter = subscriptionType ? { subscriptionType } : {};
    
            const videos = await Video.find(filter);
    
            const videosWithUploaderInfo = await Promise.all(
                videos.map(async (video) => {
                    const uploader = await UserService.getUploaderInfoById(req.headers.authorization);
                    return {
                        ...video.toObject(),
                        uploader: uploader ? uploader.name : 'Unknown',
                    };
                })
            );
    
            return res.json(videosWithUploaderInfo);
        } catch (error) {
            return next(error);
        }
    }
    
}

export default new VideoController();
