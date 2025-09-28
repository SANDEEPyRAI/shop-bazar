import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = "your_jwt_secret";
const dataPath = path.resolve("./data/users.json");

// Helpers
const readUsers = () => {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf-8");
  return data ? JSON.parse(data) : [];
};

const writeUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), "utf-8");
};

// Signup
export const signup = async (req, res, next) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const users = readUsers();
    const exist = users.find((u) => u.email === email);
    if (exist) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(username, email, hashedPassword, !!isAdmin);
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};
