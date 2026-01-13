import ItemOption from "../../models/itemOption.model.js";
import MenuItem from "../../models/menuItem.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const addOption = asyncHandler(async (req, res) => {
  const { name, itemId } = req.body;

  if (!name || !itemId) {
    return res
      .status(400)
      .json({ success: false, message: "Option name and itemId required" });
  }

  const item = await MenuItem.findById(itemId);
  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Menu item not found" });
  }

  const option = await ItemOption.create({
    name,
    choices: [],
  });

  item.options.push(option._id);
  await item.save();

  res
    .status(201)
    .json(new ApiResponse(201, option, "Option added to item"));
});
