import mongoose from "mongoose";
import uuid from "uuid";

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
  const generatedToken = uuid.v4();
  this.token = generatedToken;
  return generatedToken;
};

export default mongoose.model("Warden", wardenSchema);
