import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get("/",(req,res) => {
    res.status(200).send("Welcome to Subscription Tracking API");
})

app.listen(PORT,() => {
    console.log(`Subscription Tracking API is running at http://localhost:${PORT}`)
})

export default app;