import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import User from "../../models/user.model.js";

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ Validate ID early
  if (!id) {
    throw new ApiError(400, "User ID is required");
  }

  // ✅ Allowed fields (schema-safe)
  const allowedUpdates = ["name", "email", "role", "status"];
  const updates = {};

  for (const field of allowedUpdates) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  // ❌ Prevent empty update
  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "User updated successfully")
  );
});
