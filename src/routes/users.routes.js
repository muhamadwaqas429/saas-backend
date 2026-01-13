import express from "express";

import { getAllUsers } from "../controllers/users/getAllUsers.controller.js";
import { getUserById } from "../controllers/users/getUserById.controller.js";
import { updateUser } from "../controllers/users/updateUser.controller.js";
import { deleteUser } from "../controllers/users/deleteUser.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT /api/users/:id
router.put("/:id",authorizeRoles("admin"),updateUser);

// DELETE /api/users/:id
router.delete("/:id",authorizeRoles("admin") ,deleteUser);

export default router;
