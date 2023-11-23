import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const sessionSchema = new mongoose.Schema({
  slotTime: { type: Date, required: true },
});

const wardenSchema = new mongoose.Schema({
  universityID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  sessions: [sessionSchema],
});

wardenSchema.methods.generateAuthToken = function () {
  const generatedToken = uuidv4();
  this.token = generatedToken;
  return generatedToken;
};

export default mongoose.model("Warden", wardenSchema);
