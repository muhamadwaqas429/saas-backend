import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { emitOrderUpdate } from "../../utils/socket.js";

const ALLOWED_STATUSES = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "cancelled",
  "completed",
];

/**
 * PUT /api/orders/admin/:id/status
 * Admin: update order status
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  // Update directly without populate
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true } // return updated doc
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Emit real-time update
  emitOrderUpdate(order._id.toString(), {
    orderId: order._id,
    status: order.status,
  });

  // Populate before sending response
  const populatedOrder = await Order.findById(order._id)
    .populate("user", "name email")
    .populate("items.item", "name price")
    .populate("items.selectedOptions.option", "name")
    .populate("items.selectedOptions.choice", "name");

  res
    .status(200)
    .json(new ApiResponse(200, populatedOrder, "Order status updated"));
});
