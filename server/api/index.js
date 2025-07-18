import express from 'express';
import serverless from 'serverless-http';
import 'dotenv/config';
import cors from 'cors';
import connectDB from '../server/configs/db.js'; // Adjust path as needed
import adminRouter from '../server/routes/adminRoutes.js';
import blogRouter from '../server/routes/blogRoutes.js';

const app = express();
await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is working from /api'));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

export const handler = serverless(app);
