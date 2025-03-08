import e, { Router } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/route.js";

const app = e();
app.use(e.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true,
}));

const PORT = 4001;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Connect to MongoDB   
mongoose.connect(
  process.env.MONGO_URL,
).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

app.use('/api', router);