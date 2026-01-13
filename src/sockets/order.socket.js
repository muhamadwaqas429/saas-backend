import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    selectedOptions: [
      {
        option: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ItemOption",
          required: true,
        },
        choice: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "OptionChoice",
          required: true,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const customerDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // User is optional (guest → draft order)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Order must contain at least one item",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    customerDetails: {
      type: customerDetailsSchema,
      default: {},
    },

    status: {
      type: String,
      enum: [
        "draft",
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "cancelled",
        "completed",
      ],
      default: "draft",
      index: true,
    },

    // Helps reconnect draft orders after login
    sessionKey: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

// Helpful indexes for admin dashboard
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
