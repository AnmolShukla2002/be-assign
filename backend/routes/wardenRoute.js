import express from "express";
import {
  bookSlot,
  getFreeSlots,
  loginController,
  registerController,
} from "../controllers/wardenController.js";
import { authenticateToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/free-slots", authenticateToken, getFreeSlots);
router.post("/book-slot", authenticateToken, bookSlot);

export default router;
