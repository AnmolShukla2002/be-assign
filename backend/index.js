import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import wardenRoute from "./routes/wardenRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
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

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/", wardenRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
