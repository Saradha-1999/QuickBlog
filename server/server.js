import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Immediately connect to DB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is working'));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// ❌ DO NOT CALL app.listen()

// ✅ Export the app for Vercel to use as a Serverless Function
export default app;






// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './configs/db.js';
// import adminRouter from './routes/adminRoutes.js';
// import blogRouter from './routes/blogRoutes.js';


// const app = express();
// await connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes

// app.get('/', (req, res) => res.send("API is working"));
// app.use('/api/admin', adminRouter);
// app.use('/api/blog', blogRouter);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log('Server is running on port'+ PORT);
// });

// export default app;