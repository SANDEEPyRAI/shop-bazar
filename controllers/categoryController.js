import fs from "fs";
import path from "path";
import Category from "../models/Category.js";

const dataPath = path.resolve("./data/categories.json");

// Helpers
const readCategories = () => {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf-8");
  return data ? JSON.parse(data) : [];
};

const writeCategories = (categories) => {
  fs.writeFileSync(dataPath, JSON.stringify(categories, null, 2), "utf-8");
};

// Get all categories
export const getCategories = (req, res, next) => {
  try {
    const categories = readCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// Add category (admin only)
export const addCategory = (req, res, next) => {
  try {
    // Extra safety: admin check
    if (!req.user?.isAdmin)
      return res.status(403).json({ error: "Access denied: Admins only" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const categories = readCategories();
    const newCategory = new Category(name);
    categories.push(newCategory);
    writeCategories(categories);

    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};
