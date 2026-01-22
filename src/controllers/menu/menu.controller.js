import MenuSection from "../../models/menuSection.model.js";
import MenuItem from "../../models/menuItem.model.js";
import ItemOption from "../../models/itemOption.model.js";
import OptionChoice from "../../models/optionChoice.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { io } from "../../index.js";

/* =====================
   GET MENU (PUBLIC)
===================== */
export const getMenu = asyncHandler(async (req, res) => {
  const sections = await MenuSection.find().populate({
    path: "items",
    populate: {
      path: "options",
      populate: { path: "choices" },
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, sections, "Menu fetched successfully"));
});

/* =====================
   ADMIN → ADD SECTION
===================== */
export const addMenuSection = asyncHandler(async (req, res) => {
  const { name, status, imageUrl } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Section name required" });
  }

  const section = await MenuSection.create({
    name,
    items: [],
    status: status || "active",
    imageUrl: imageUrl || null,
  });

  const populated = await MenuSection.findById(section._id).populate({
    path: "items",
    populate: { path: "options", populate: { path: "choices" } },
  });

  io.emit("menu-updated");

  res.status(201).json(new ApiResponse(201, populated, "Menu section created"));
});

/* =====================
   ADMIN → ADD ITEM
===================== */
export const addMenuItem = asyncHandler(async (req, res) => {
  const { name, sectionId, imageUrl, price } = req.body;

  if (!name || !sectionId) {
    return res.status(400).json({
      message: "Item name and sectionId required",
    });
  }

  const section = await MenuSection.findById(sectionId);
  if (!section) {
    return res.status(404).json({ message: "Menu section not found" });
  }

  const item = await MenuItem.create({
    name,
    options: [],
    imageUrl: imageUrl || null,
    price: price || 10, // default price
  });

  section.items.push(item._id);
  await section.save();

  const populatedItem = await MenuItem.findById(item._id).populate({
    path: "options",
    populate: { path: "choices" },
  });

  io.emit("menu-updated");

  res.status(201).json(new ApiResponse(201, populatedItem, "Menu item added"));
});

/* =====================
   ADMIN → ADD OPTION
===================== */
export const addMenuOption = asyncHandler(async (req, res) => {
  const { name, itemId, imageUrl } = req.body;

  if (!name || !itemId) {
    return res.status(400).json({
      message: "Option name and itemId required",
    });
  }

  const item = await MenuItem.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const option = await ItemOption.create({
    name,
    choices: [],
    imageUrl: imageUrl || null,
  });

  item.options.push(option._id);
  await item.save();

  const populatedItem = await MenuItem.findById(itemId).populate({
    path: "options",
    populate: { path: "choices" },
  });

  io.emit("menu-updated");

  res.status(201).json(new ApiResponse(201, populatedItem, "Option added"));
});

/* =====================
   ADMIN → ADD CHOICE
===================== */
export const addOptionChoice = asyncHandler(async (req, res) => {
  const { name, optionId, imageUrl, price } = req.body;

  if (!name || !optionId) {
    return res.status(400).json({
      message: "Choice name and optionId required",
    });
  }

  const option = await ItemOption.findById(optionId);
  if (!option) {
    return res.status(404).json({ message: "Menu option not found" });
  }

  const choice = await OptionChoice.create({
    name,
    imageUrl: imageUrl || null,
    price: price || 10, // default price
  });

  option.choices.push(choice._id);
  await option.save();

  const populatedOption =
    await ItemOption.findById(optionId).populate("choices");

  io.emit("menu-updated");

  res.status(201).json(new ApiResponse(201, populatedOption, "Choice added"));
});
