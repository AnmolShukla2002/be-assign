import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warden",
    required: true,
  },
  slotTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
});

export default mongoose.model("Session", sessionSchema);
