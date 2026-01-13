import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate("items.item");
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (
    order.user &&
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});
