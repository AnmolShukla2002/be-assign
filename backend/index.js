import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("API IS WORKING");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Error while connecting to database");
  }
};

app.listen(PORT, (req, res) => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
