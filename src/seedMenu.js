import mongoose from "mongoose";
import MenuSection from "./models/menuSection.model.js";
import MenuItem from "./models/menuItem.model.js";
import ItemOption from "./models/itemOption.model.js";
import OptionChoice from "./models/optionChoice.model.js";
import dotenv from "dotenv";

dotenv.config();

const menuData = [
  {
    name: "Lunch Specials",
    items: [
      {
        name: "Chicken Over Rice",
        options: [
          {
            name: "Grain",
            choices: ["White Rice", "Brown Rice"],
          },
          {
            name: "Sauce",
            choices: ["BBQ", "Teriyaki"],
          },
        ],
      },
      {
        name: "Lamb with Salad",
        options: [
          {
            name: "Salad Dressing",
            choices: ["Ranch", "Vinaigrette"],
          },
        ],
      },
    ],
  },
  {
    name: "Dinner Specials",
    items: [
      {
        name: "Steak & Fries",
        options: [
          {
            name: "Cook Level",
            choices: ["Rare", "Medium", "Well Done"],
          },
        ],
      },
    ],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await MenuSection.deleteMany({});
    await MenuItem.deleteMany({});
    await ItemOption.deleteMany({});
    await OptionChoice.deleteMany({});

    for (let section of menuData) {
      const itemsIds = [];

      for (let item of section.items) {
        const optionsIds = [];

        for (let option of item.options) {
          const choiceIds = [];

          for (let choiceName of option.choices) {
            const choice = await OptionChoice.create({ name: choiceName });
            choiceIds.push(choice._id);
          }

          const opt = await ItemOption.create({
            name: option.name,
            choices: choiceIds,
          });
          optionsIds.push(opt._id);
        }

        const itm = await MenuItem.create({
          name: item.name,
          options: optionsIds,
        });
        itemsIds.push(itm._id);
      }

      await MenuSection.create({ name: section.name, items: itemsIds });
    }

    console.log("Seed completed!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
