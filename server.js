import connectDB from "./backend/config/db.js";
import userRoutes from "./backend/routes/userRoutes.js";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

//connect database
connectDB();

//dotenv config
dotenv.config();

const app = express();
app.use(bodyParser.json());

//Creating API for user
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8082;

app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
