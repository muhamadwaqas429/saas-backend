import User from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { writeLog } from "../../utils/logger.js";
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    writeLog("register", "User registered", {
      userId: user._id,
      email: user.email,
      ip: req.ip,
    });

    // Send response with token
    return res
      .status(201)
      .json(
        new ApiResponse(201, { user, token }, "User registered successfully")
      );
  } catch (error) {
    next(error);
  }
};

export { registerUser };
