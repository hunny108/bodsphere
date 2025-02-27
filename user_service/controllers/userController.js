import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';
import User from '../models/user.js';

dotenv.config();

class UserController {
    async register(request, response, next) {
        const validationSchema = Joi.object({
            email: Joi.string().email().trim().required(),
            name: Joi.string().trim().required(),
            password: Joi.string().min(6).trim().required(),
            role: Joi.string().valid('Admin', 'User').required(),
            subscriptionType: Joi.string().valid("Free", "Paid").required()
        });

        try {
            let validateBody = await validationSchema.validateAsync(request.body);
            const { email, password, role, subscriptionType,name } = validateBody;

            console.log("🚀 ~ UserController ~ register ~ email, password, role, subscriptionType:", email, password, role, subscriptionType);

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return response.status(400).json({ message: "Email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                subscriptionType
            });

            await user.save();

            return response.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            return next(error);
        }
    }


    async login(request, response, next) {
        const validationSchema = Joi.object({
            email: Joi.string().email().trim().required(),
            password: Joi.string().trim().required()
        });
        try {
            let { email, password } = await validationSchema.validateAsync(request.body);

            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid Credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid Credentials");

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            return response.json({ "token": token, "message": "Login success" });
        } catch (error) {
            return next(error);
        }
    }

    async getUserDetailById(request, response, next) {
        try {
            const userId = request.user.id;
    
            const user = await User.findById(userId);
            console.log("🚀 ~ UserController ~ getUserDetailById ~ user:", user)
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }
    
            return response.json({
                id: user._id,
                email: user.email,
                name: user.name,
                profileImage: user.profileImage
            });
        } catch (error) {
            return next(error);
        }
    }
    
}

export default new UserController();
