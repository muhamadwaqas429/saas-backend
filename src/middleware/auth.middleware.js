import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (exclude password)
      const user = await User.findById(decoded.id).select("-password");
      if (!user) throw new ApiError(401, "User not found");

      req.user = user;
      next();
    } catch (err) {
      return next(new ApiError(401, "Not authorized, invalid token"));
    }
  } else {
    return next(new ApiError(401, "Not authorized, token missing"));
  }
};
