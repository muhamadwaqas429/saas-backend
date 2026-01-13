import { writeLog } from "../../utils/logger.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const logoutUser = async (req, res) => {
  const user = req.user; // comes from auth middleware

  writeLog("logout", "User logged out", {
    userId: user._id,
    email: user.email,
    ip: req.ip,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful"));
};

export { logoutUser };
