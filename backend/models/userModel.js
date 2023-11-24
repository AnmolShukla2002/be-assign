import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const wardenSchema = new mongoose.Schema({
  universityID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  sessions: [
    {
      day: { type: String, enum: ["Thursday", "Friday"], required: true },
      time: { type: String, default: "10:00 AM" },
      bookedBy: { type: String },
    },
  ],
});

wardenSchema.methods.generateAuthToken = function () {
  const generatedToken = uuidv4();
  this.token = generatedToken;
  return generatedToken;
};

export default mongoose.model("Warden", wardenSchema);
