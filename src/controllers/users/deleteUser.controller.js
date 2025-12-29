import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import User from "../../models/user.model.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});
