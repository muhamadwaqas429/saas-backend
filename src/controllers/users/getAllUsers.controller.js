import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (role && role !== "all") {
    query.role = role;
  }

  if (status && status !== "all") {
    query.status = status;
  }

  const users = await User.find(query)
    .select("name email role status createdAt") // ✅ keep _id automatically
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, { users }, "Users fetched successfully")
  );
});
