import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import videoRoutes from './routes/video.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Video Service running on port ${PORT}`));