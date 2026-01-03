import mongoose from "mongoose";
import ItemOption from "./itemOption.model.js"; // import so Mongoose knows

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemOption" }],
});

export default mongoose.model("MenuItem", menuItemSchema);
