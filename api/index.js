import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Book from "./models/bookmodel.js";
import route from "./routes/bookroute.js";

// Load environment variables
dotenv.config();

const app = express();

// Access environment variables
const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/books", route);

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
