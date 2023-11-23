import jwt from "jsonwebtoken";
import Warden from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Warden.findOne({ _id: decoded._id, token: token });

    if (!user) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token." });
  }
};
