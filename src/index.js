// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db/connection.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import menuRoutes from "./routes/menu.routes.js";

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
import { protect } from "./middleware/auth.middleware.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

/* ======================
   SOCKET.IO SETUP
====================== */
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("join-order", (orderId) => {
    socket.join(orderId);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/users", protect, usersRoutes);
app.use("/api/analytics", protect, analyticsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/menu", protect, menuRoutes);

app.use(errorHandler);

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
