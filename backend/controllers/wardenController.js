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
      sessions: [
        { day: "Thursday", time: "10:00 AM", bookedBy: null },
        { day: "Friday", time: "10:00 AM", bookedBy: null },
      ],
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

export const bookSlot = async (req, res) => {
  try {
    const { slotId, wardenId } = req.body;

    const warden = await Warden.findById(wardenId);
    if (!warden) {
      return res.status(404).json({ error: "Warden not found." });
    }

    const sessionToBook = warden.sessions.find(
      (session) => session._id.toString() === slotId
    );
    if (!sessionToBook) {
      return res.status(404).json({ error: "Slot not found." });
    }

    if (sessionToBook.isBooked) {
      return res.status(400).json({ error: "Slot is already booked." });
    }

    sessionToBook.isBooked = true;
    sessionToBook.bookedBy = wardenId;
    await warden.save();

    res.status(200).json({ message: "Slot booked successfully.", warden });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
