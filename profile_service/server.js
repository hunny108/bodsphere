import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import profileRoutes from './routes/profile.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Video Service running on port ${PORT}`));