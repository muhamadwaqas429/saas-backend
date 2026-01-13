import User from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { getPagination } from "../../utils/pagination.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;
  const { page, limit, skip } = getPagination(req);

  let query = {};

  // 🔍 Search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // 🎭 Role filter
  if (role && role !== "all") {
    query.role = role;
  }

  // 🔄 Status filter
  if (status && status !== "all") {
    query.status = status;
  }

  // 📊 Total count (for pagination info)
  const totalUsers = await User.countDocuments(query);

  // 📥 Paginated users
  const users = await User.find(query)
    .select("name email role status createdAt")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        pagination: {
          page,
          limit,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
        },
      },
      "Users fetched successfully"
    )
  );
});
