// src/routes/orders.routes.js
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import { previewOrder } from "../controllers/orders/previewOrder.controller.js";
import { placeOrder } from "../controllers/orders/placeOrder.controller.js";
import { getMyOrders } from "../controllers/orders/getMyOrders.controller.js";
import { getOrderById } from "../controllers/orders/getOrderById.controller.js";

import { getAllOrders } from "../controllers/admin/getAllOrders.controller.js";
import { updateOrderStatus } from "../controllers/admin/updateOrderStatus.controller.js";
import { cancelOrder } from "../controllers/orders/cancelOrder.controller.js";

const router = express.Router();

/* =========================
   USER ROUTES
========================= */

// User must be logged in
router.use(protect);

router.get("/me", getMyOrders);
router.get("/preview", previewOrder);
router.get("/preview/:sessionKey", previewOrder);
router.post("/", placeOrder);

// ⚠️ Must stay LAST
router.get("/:id", getOrderById);

/* =========================
   ADMIN ROUTES
========================= */

router.get("/admin/all", protect, authorizeRoles("admin"), getAllOrders);

router.put(
  "/admin/:id/status",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

router.put("/admin/:id/cancel", protect, authorizeRoles("admin"), cancelOrder);

export default router;
