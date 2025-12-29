import express from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { loginUser } from "../controllers/auth/login.controller.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

export default router;
