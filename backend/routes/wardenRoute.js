import express from "express";
import {
  bookSlot,
  getFreeSlots,
  loginController,
  registerController,
} from "../controllers/wardenController.js";
// import { authenticateToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/free-slots", getFreeSlots);
router.post("/book-slot", bookSlot);

export default router;

//TOKEN A: 9e6c4226-ae12-44e2-9823-36e92f5bdc50
