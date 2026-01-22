import mongoose from "mongoose";

/* =======================
   Order Item Schema
======================= */
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
      default: 10, // default price if backend does not have it
    },
  },
  { _id: false }
);

/* =======================
   Customer Details Schema
======================= */
const customerDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
  },
  { _id: false }
);

/* =======================
   Main Order Schema
======================= */
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // guest orders allowed
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
      // removed inline index to avoid duplicate warning
    },

    sessionKey: {
      type: String,
      default: null,
      index: true, // for guest order tracking
    },
  },
  { timestamps: true }
);

/* =======================
   Indexes
======================= */
orderSchema.index({ createdAt: -1 }); // latest orders first
orderSchema.index({ status: 1 }); // admin queries by status

/* =======================
   Export Order Model
======================= */
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
