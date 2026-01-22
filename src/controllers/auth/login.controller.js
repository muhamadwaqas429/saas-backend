import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { writeLog } from "../../utils/logger.js";
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    writeLog("login", "User logged in", {
      userId: user._id,
      email: user.email,
      ip: req.ip,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { user, token }, "Login successful"));
  } catch (err) {
    next(err);
  }
};

export { loginUser };
