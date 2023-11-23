import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/wardenController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;

//241f7e64-411a-42cd-8761-c143ff7a8ac4 authToken
