import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getMenu,
  addMenuSection,
  addMenuItem,
  addMenuOption,
  addOptionChoice,
} from "../controllers/menu/menu.controller.js";

const router = express.Router();

// PUBLIC
router.get("/", getMenu);

// ADMIN ONLY
router.post("/section", protect, authorizeRoles("admin"), addMenuSection);
router.post("/item", protect, authorizeRoles("admin"), addMenuItem);
router.post("/option", protect, authorizeRoles("admin"), addMenuOption);
router.post("/choice", protect, authorizeRoles("admin"), addOptionChoice);

export default router;
