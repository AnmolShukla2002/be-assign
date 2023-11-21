import Warden from "../models/userModel.js";

export const getFreeSlots = async (req, res) => {
  const id = req.params.id;
  const warden = await Warden.findById(id);
};

export const bookSlot = async (req, res) => {};

export const getPendingSessions = async (req, res) => {};
