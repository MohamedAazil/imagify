import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const port = process.env.port || 4000;
const app = express();


app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: import.meta.env.FRONTEND_URL }));

await connectDb();

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.get('/',(req,res)=>(res.send("Api is Working")));

app.listen(port,()=>{console.log("Server running on port " + port)});
