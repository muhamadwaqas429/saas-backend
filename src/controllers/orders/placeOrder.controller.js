import Order from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

export const placeOrder = asyncHandler(async (req, res) => {
  const { items, name, phone, address, sessionKey } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  let totalAmount = 0;

  const validatedItems = items.map((i) => {
    // Ensure item, quantity, and price exist
    if (!i.item || !mongoose.Types.ObjectId.isValid(i.item)) {
      throw new Error("Invalid or missing 'item' id");
    }
    if (!i.price || typeof i.price !== "number") {
      throw new Error("Invalid or missing 'price'");
    }
    if (!i.quantity || typeof i.quantity !== "number" || i.quantity < 1) {
      throw new Error("Invalid or missing 'quantity'");
    }

    // Validate selectedOptions
    if (i.selectedOptions && i.selectedOptions.length > 0) {
      i.selectedOptions.forEach((opt) => {
        if (
          !opt.option ||
          !mongoose.Types.ObjectId.isValid(opt.option) ||
          !opt.choice ||
          !mongoose.Types.ObjectId.isValid(opt.choice)
        ) {
          throw new Error("Invalid 'option' or 'choice' ObjectId");
        }
      });
    }

    totalAmount += i.price * i.quantity;
    return i;
  });

  const order = await Order.create({
    user: req.user ? req.user._id : null,
    items: validatedItems,
    totalAmount,
    status: "placed",
    customerDetails: { name, phone, address },
    sessionKey: req.user ? null : sessionKey,
  });

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});
