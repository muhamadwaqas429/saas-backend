import MenuSection from "../models/menuSection.model.js";

export const getMenu = async (req, res) => {
  try {
    const sections = await MenuSection.find().populate({
      path: "items",
      populate: {
        path: "options",
        populate: { path: "choices" },
      },
    });

    res.status(200).json({ data: sections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching menu" });
  }
};
