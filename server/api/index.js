// server/api/index.js
import express from 'express';
import serverless from 'serverless-http';
import 'dotenv/config';
import cors from 'cors';
import connectDB from '../configs/db.js'; // Make sure the path is correct
import adminRouter from '../routes/adminRoutes.js';
import blogRouter from '../routes/blogRoutes.js';

const app = express();
await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is working from /api'));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

export const handler = serverless(app);
