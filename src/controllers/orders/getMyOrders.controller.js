import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

/**
 * GET /api/orders/me
 * Fetch orders for the logged-in user (or guest by sessionKey)
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const query = req.user
    ? { user: req.user._id }
    : { sessionKey: req.query.sessionKey };

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .populate("items.item", "name price image sectionName description")
    .populate("items.selectedOptions.option", "name")
    .populate("items.selectedOptions.choice", "name");

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Your orders fetched successfully"));
});
