import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 10 }, // default if backend has no price
  image: { type: String, default: null }, // optional image URL
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemOption" }],
});

const MenuItem =
  mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
