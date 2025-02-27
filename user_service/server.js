import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import helmet from 'helmet'

dotenv.config();
const app = express();
app.use(helmet())
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));