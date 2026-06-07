import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "food.data.js");

// Read food list from the data file (dynamic import workaround using eval-style read)
let foodList = [];

const loadFoodList = async () => {
  try {
    const mod = await import(`./food.data.js?update=${Date.now()}`);
    foodList = mod.foodList || mod.default || [];
  } catch {
    foodList = [];
  }
};

await loadFoodList();

// Get all food items
export const getAllFoods = (req, res) => {
  res.json({ success: true, data: foodList });
};

// Add a new food item
export const addFood = (req, res) => {
  const { name, description, price, category, image } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: "Name, price, and category are required." });
  }

  const newFood = {
    _id: `food_${Date.now()}`,
    name,
    description: description || "",
    price: Number(price),
    category,
    image: image || "default.png",
  };

  foodList.push(newFood);
  saveFoodList();
  res.status(201).json({ success: true, message: "Food added successfully.", data: newFood });
};

// Remove a food item by ID
export const removeFood = (req, res) => {
  const { id } = req.params;
  const index = foodList.findIndex((f) => f._id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Food item not found." });
  }

  const removed = foodList.splice(index, 1)[0];
  saveFoodList();
  res.json({ success: true, message: "Food removed successfully.", data: removed });
};

// Update a food item
export const updateFood = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const index = foodList.findIndex((f) => f._id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Food item not found." });
  }

  foodList[index] = { ...foodList[index], ...updates };
  saveFoodList();
  res.json({ success: true, message: "Food updated successfully.", data: foodList[index] });
};

// Persist the foodList back to food.data.js
const saveFoodList = () => {
  const content = `export const foodList = ${JSON.stringify(foodList, null, 2)};\n`;
  try {
    fs.writeFileSync(dataPath, content, "utf-8");
  } catch (err) {
    console.error("Failed to save food list:", err);
  }
};