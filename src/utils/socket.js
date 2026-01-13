import { io } from "../index.js";

export const emitOrderUpdate = (orderId, payload) => {
  if (!io) return;
  io.to(orderId).emit("order-updated", payload);
};
