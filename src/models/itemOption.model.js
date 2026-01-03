import mongoose from "mongoose";
import OptionChoice from "./optionChoice.model.js";

const itemOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  choices: [{ type: mongoose.Schema.Types.ObjectId, ref: "OptionChoice" }],
});

export default mongoose.model("ItemOption", itemOptionSchema);
