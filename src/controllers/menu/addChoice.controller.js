import OptionChoice from "../../models/optionChoice.model.js";
import ItemOption from "../../models/itemOption.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const addChoice = asyncHandler(async (req, res) => {
  const { name, optionId } = req.body;

  if (!name || !optionId) {
    return res.status(400).json({
      success: false,
      message: "Choice name and optionId required",
    });
  }

  const option = await ItemOption.findById(optionId);
  if (!option) {
    return res.status(404).json({
      success: false,
      message: "Option not found",
    });
  }

  const choice = await OptionChoice.create({ name });

  option.choices.push(choice._id);
  await option.save();

  res.status(201).json(new ApiResponse(201, choice, "Choice added to option"));
});
