import express from "express";
import { getMenu } from "../controllers/menu.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = express.Router();

router.get("/", authorizeRoles("user"), getMenu);

export default router;
