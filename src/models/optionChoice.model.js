import mongoose from "mongoose";

const optionChoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 }, // optional price
  image: { type: String, default: null }, // optional image URL
});

const OptionChoice =
  mongoose.models.OptionChoice ||
  mongoose.model("OptionChoice", optionChoiceSchema);
export default OptionChoice;
