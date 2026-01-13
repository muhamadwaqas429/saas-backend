import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const previewOrder = asyncHandler(async (req, res) => {
  const { sessionKey } = req.params;

  if (!sessionKey) {
    return res
      .status(200)
      .json(new ApiResponse(200, { items: [] }, "Empty preview"));
  }

  const order = await Order.findOne({
    sessionKey,
    status: { $in: ["draft", "placed"] },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(new ApiResponse(200, order, "Preview order fetched"));
});
