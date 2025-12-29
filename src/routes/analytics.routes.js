import express from "express";
import {
  getDashboardCards,
  getStatusRatio,
  getRoleCount,
  getRoleStatusLine,
} from "../controllers/analytics/analytics.controller.js";

const router = express.Router();

// GET /api/analytics/dashboard-cards
router.get("/dashboard-cards", getDashboardCards);

// GET /api/analytics/status-ratio
router.get("/status-ratio", getStatusRatio);

// GET /api/analytics/role-count
router.get("/role-count", getRoleCount);

// GET /api/analytics/role-status-line
router.get("/role-status-line", getRoleStatusLine);

export default router;
