import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
import { protect } from "./middleware/auth.middleware.js";
import menuRoutes from "./routes/menu.routes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Public routes
app.use("/api/users", protect, usersRoutes); // Protected routes
app.use("/api/analytics", protect, analyticsRoutes); // Protected routes
app.use("/api/menu", protect, menuRoutes);
// Error handler (should be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
