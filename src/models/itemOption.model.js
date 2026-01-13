import mongoose from "mongoose";

const itemOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 }, // optional price
  image: { type: String, default: null }, // optional image URL
  choices: [{ type: mongoose.Schema.Types.ObjectId, ref: "OptionChoice" }],
});

const ItemOption =
  mongoose.models.ItemOption || mongoose.model("ItemOption", itemOptionSchema);
export default ItemOption;
