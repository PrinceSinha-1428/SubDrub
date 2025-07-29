import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js';

const app = express();



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter)

app.get("/",(req,res) => {
    res.status(200).send("Welcome to Subscription Tracking API");
})

app.listen(PORT,async () => {
    await connectToDatabase();
    console.log(`Subscription Tracking API is running at http://localhost:${PORT}`);
})

export default app;