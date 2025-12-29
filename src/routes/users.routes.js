import express from "express";

import { getAllUsers } from "../controllers/users/getAllUsers.controller.js";
import { getUserById } from "../controllers/users/getUserById.controller.js";
import { updateUser } from "../controllers/users/updateUser.controller.js";
import { deleteUser } from "../controllers/users/deleteUser.controller.js";

const router = express.Router();

// GET /api/users
router.get("/", getAllUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
