import mongoose from "mongoose";
import MenuItem from "./menuItem.model.js";

const menuSectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
});

export default mongoose.model("MenuSection", menuSectionSchema);
