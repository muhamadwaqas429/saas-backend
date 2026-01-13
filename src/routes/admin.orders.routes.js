import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getAllOrders, updateOrderStatus } from "../controllers/admin/index.js"; // or individually

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

// Admin orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

export default router;
