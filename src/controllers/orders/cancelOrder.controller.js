import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { emitOrderUpdate } from "../../utils/socket.js";

export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  order.status = "cancelled";
  await order.save();

  // 🔥 REALTIME UPDATE
  emitOrderUpdate(order._id.toString(), {
    status: "cancelled",
    orderId: order._id,
  });

  res.status(200).json(new ApiResponse(200, order, "Order cancelled"));
});
