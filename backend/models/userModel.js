import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const wardenSchema = new mongoose.Schema({
  universityID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  sessions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Warden" },
      slotTime: { type: Date, required: true },
      isPending: { type: Boolean, default: true },
    },
  ],
});

wardenSchema.methods.generateAuthToken = function () {
  const generatedToken = uuidv4();
  this.token = generatedToken;
  return generatedToken;
};

export default mongoose.model("Warden", wardenSchema);
