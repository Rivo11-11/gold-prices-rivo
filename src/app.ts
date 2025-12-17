import "./config/env.js";
import 'express-async-errors';
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import metalRouter from "./routers/metalRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Trust proxy
app.set('trust proxy', 1);


// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));


app.use('/api/v1/metal', metalRouter);


app.use(globalErrorHandler);




// Connect to MongoDB and start server
mongoose.connect(MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
