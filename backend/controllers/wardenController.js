import Warden from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { universityID, name, password } = req.body;
    const existingWarden = await Warden.findOne({ universityID });
    if (existingWarden) {
      return res
        .status(400)
        .json({ error: "Warden with this universityID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newWarden = new Warden({
      universityID,
      name,
      password: hashedPassword,
    });
    const authToken = newWarden.generateAuthToken();
    await newWarden.save();
    res.status(201).json({ warden: newWarden, token: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { universityID, password } = req.body;
    const user = await Warden.findOne({ universityID });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const authToken = user.generateAuthToken();
    await user.save();
    res.json({ user, token: authToken });
  } catch {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFreeSlots = async (req, res) => {};

export const bookSlot = async (req, res) => {};

export const getPendingSessions = async (req, res) => {};
