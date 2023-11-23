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
    const days = [4, 5];
    const hours = [10];

    for (const day of days) {
      for (const hour of hours) {
        const slotTime = new Date();
        slotTime.setUTCHours(hour, 0, 0, 0);
        const currentDay = slotTime.getUTCDay();
        const daysToAdd = day - currentDay + (currentDay <= day ? 0 : 7);
        slotTime.setUTCDate(slotTime.getUTCDate() + daysToAdd);
        const formattedSession = {
          day: slotTime.toLocaleString("en-US", { weekday: "long" }),
          time: slotTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          slotTime: slotTime,
        };
        newWarden.sessions.push(formattedSession);
      }
    }

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

export const createSession = async (req, res) => {};

export const getFreeSlots = async (req, res) => {};

export const bookSlot = async (req, res) => {};

export const getPendingSessions = async (req, res) => {};
