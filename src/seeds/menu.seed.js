import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import MenuSection from "../models/menuSection.model.js";
import MenuItem from "../models/menuItem.model.js";
import ItemOption from "../models/itemOption.model.js";
import OptionChoice from "../models/optionChoice.model.js";

// --------------------------
// Connect to Mongo
// --------------------------
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not found in .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
console.log("MongoDB connected for seeding...");

// --------------------------
// Clear previous menu data
// --------------------------
await MenuSection.deleteMany({});
await MenuItem.deleteMany({});
await ItemOption.deleteMany({});
await OptionChoice.deleteMany({});
console.log("Cleared old menu data");

// --------------------------
// Large menu data with images
// --------------------------
const menuSeed = [
  {
    name: "Starters",
    items: [
      {
        name: "Garlic Bread",
        price: 6.5,
        image:
          "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        options: [
          {
            name: "Add Toppings",
            choices: [
              { name: "Extra Cheese", price: 2 },
              { name: "Herbs & Spices", price: 1.5 },
            ],
          },
        ],
      },
      {
        name: "Buffalo Wings",
        price: 9.0,
        image:
          "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg",
        options: [
          {
            name: "Sauce",
            choices: [
              { name: "Honey BBQ", price: 1.5 },
              { name: "Spicy Buffalo", price: 1.5 },
              { name: "Teriyaki", price: 2 },
            ],
          },
        ],
      },
    ],
  },

  {
    name: "Main Course",
    items: [
      {
        name: "Margherita Pizza",
        price: 12.5,
        image:
          "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        options: [
          {
            name: "Size",
            choices: [
              { name: "Small", price: 0 },
              { name: "Medium", price: 3 },
              { name: "Large", price: 5 },
            ],
          },
          {
            name: "Extra Toppings",
            choices: [
              { name: "Olives", price: 1 },
              { name: "Mushrooms", price: 1.2 },
              { name: "Pepperoni", price: 2 },
            ],
          },
        ],
      },
      {
        name: "Grilled Salmon",
        price: 18.99,
        image:
          "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
        options: [
          {
            name: "Cook Level",
            choices: [
              { name: "Medium", price: 0 },
              { name: "Well Done", price: 0 },
            ],
          },
        ],
      },
      {
        name: "Beef Burger",
        price: 11.0,
        image:
          "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg",
        options: [
          {
            name: "Add Cheese",
            choices: [
              { name: "Cheddar", price: 1.5 },
              { name: "Swiss", price: 1.5 },
            ],
          },
          {
            name: "Bun Type",
            choices: [
              { name: "Sesame", price: 0 },
              { name: "Gluten-Free", price: 2 },
            ],
          },
        ],
      },
    ],
  },

  {
    name: "Desserts",
    items: [
      {
        name: "Chocolate Lava Cake",
        price: 8.5,
        image:
          "https://images.pexels.com/photos/257455/pexels-photo-257455.jpeg",
      },
      {
        name: "Strawberry Cheesecake",
        price: 7.99,
        image:
          "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg",
        options: [
          {
            name: "Topping",
            choices: [
              { name: "Chocolate Sauce", price: 1 },
              { name: "Strawberry Sauce", price: 1 },
            ],
          },
        ],
      },
      {
        name: "Vanilla Ice Cream",
        price: 5.5,
        image:
          "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
      },
    ],
  },

  {
    name: "Beverages",
    items: [
      {
        name: "Cappuccino",
        price: 4.5,
        image:
          "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        options: [
          {
            name: "Milk Type",
            choices: [
              { name: "Whole Milk", price: 0 },
              { name: "Almond Milk", price: 0.5 },
              { name: "Oat Milk", price: 0.7 },
            ],
          },
        ],
      },
      {
        name: "Fresh Lemonade",
        price: 3.5,
        image:
          "https://images.pexels.com/photos/1015563/pexels-photo-1015563.jpeg",
      },
      {
        name: "Iced Tea",
        price: 3.0,
        image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
      },
      {
        name: "Orange Juice",
        price: 4.0,
        image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
      },
    ],
  },

  {
    name: "Salads",
    items: [
      {
        name: "Caesar Salad",
        price: 7.5,
        image:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        options: [
          {
            name: "Add Protein",
            choices: [
              { name: "Chicken", price: 2 },
              { name: "Shrimp", price: 3 },
            ],
          },
        ],
      },
      {
        name: "Greek Salad",
        price: 6.99,
        image:
          "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
      },
    ],
  },

  {
    name: "Soups",
    items: [
      {
        name: "Tomato Soup",
        price: 5.5,
        image:
          "https://images.pexels.com/photos/1640779/pexels-photo-1640779.jpeg",
      },
      {
        name: "Chicken Noodle Soup",
        price: 6.5,
        image:
          "https://images.pexels.com/photos/1420405/pexels-photo-1420405.jpeg",
      },
    ],
  },
];

// --------------------------------
// Insert data
// --------------------------------
for (const secData of menuSeed) {
  const section = new MenuSection({
    name: secData.name,
    status: "active",
    items: [],
  });
  await section.save();

  for (const it of secData.items) {
    const item = new MenuItem({
      name: it.name,
      price: it.price,
      image: it.image || null,
      options: [],
    });

    if (Array.isArray(it.options)) {
      for (const optData of it.options) {
        const option = new ItemOption({ name: optData.name, choices: [] });
        await option.save();

        if (Array.isArray(optData.choices)) {
          for (const chData of optData.choices) {
            const choice = new OptionChoice({
              name: chData.name,
              price: chData.price || 0,
            });
            await choice.save();
            option.choices.push(choice._id);
          }
        }

        await option.save();
        item.options.push(option._id);
      }
    }

    await item.save();
    section.items.push(item._id);
  }

  await section.save();
}

console.log(
  "✅ Menu seeded with multiple sections, real images, prices, and options!"
);
mongoose.disconnect();
