import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

/**
 * GET /api/orders/admin/all
 * Admin: fetch all orders
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate("items.item", "name price image sectionName description")
    .populate("items.selectedOptions.option", "name")
    .populate("items.selectedOptions.choice", "name");

  res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders fetched successfully"));
});
