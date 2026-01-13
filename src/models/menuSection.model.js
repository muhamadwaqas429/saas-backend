import mongoose from "mongoose";

const menuSectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});

const MenuSection =
  mongoose.models.MenuSection ||
  mongoose.model("MenuSection", menuSectionSchema);
export default MenuSection;
