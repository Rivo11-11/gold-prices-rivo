import "./config/env.js";
import 'express-async-errors';
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import metalRouter from "./routers/metalRouter.js";
import "./jobs/updatePrices.js";
import currencyRouter from "./routers/currencyRouter.js";
import { FootballController } from "./controllers/FootballController.js";
import footballRouter from "./routers/footballRouter.js";
// import { agenda } from "./utils/agenda.js";

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;


app.set('trust proxy', 1);


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));


app.use('/api/v1/metal', metalRouter);
app.use('/api/v1/currency', currencyRouter);
app.use('/api/v1/football', footballRouter)

app.use(globalErrorHandler);




mongoose.connect(MONGO_URI!)
  .then(async () => {
    // await agenda.start();
    // await agenda.every("20 minutes", "update-gold-price");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
