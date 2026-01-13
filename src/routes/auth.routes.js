import express from "express";
import { registerUser } from "../controllers/auth/register.controller.js";
import { loginUser } from "../controllers/auth/login.controller.js";
import { logoutUser } from "../controllers/auth/logout.controller.js";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";
// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

router.post("/logout",protect ,logoutUser);
export default router;
