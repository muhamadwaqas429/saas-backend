import mongoose from "mongoose";

const optionChoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model("OptionChoice", optionChoiceSchema);
