import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// Dashboard summary cards
const getDashboardCards = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const activeUsers = await User.countDocuments({ status: "active" });
  const admins = await User.countDocuments({ role: "admin" });

  res.status(200).json(
    new ApiResponse(200, {
      totalUsers,
      activeUsers,
      admins,
    })
  );
});

// Status ratio chart
const getStatusRatio = asyncHandler(async (req, res) => {
  const active = await User.countDocuments({ status: "active" });
  const inactive = await User.countDocuments({ status: "inactive" });

  res.status(200).json(new ApiResponse(200, { active, inactive }));
});

// Role count chart
const getRoleCount = asyncHandler(async (req, res) => {
  const adminCount = await User.countDocuments({ role: "admin" });
  const userCount = await User.countDocuments({ role: "user" });

  res
    .status(200)
    .json(new ApiResponse(200, { admin: adminCount, user: userCount }));
});

// Role + Status line chart
const getRoleStatusLine = asyncHandler(async (req, res) => {
  const roles = ["admin", "user"];
  const status = ["active", "inactive"];
  const data = {};

  for (const role of roles) {
    data[role] = {};
    for (const st of status) {
      data[role][st] = await User.countDocuments({ role, status: st });
    }
  }

  res.status(200).json(new ApiResponse(200, data));
});

export { getDashboardCards, getStatusRatio, getRoleCount, getRoleStatusLine };
