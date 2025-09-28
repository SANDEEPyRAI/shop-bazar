import express from "express";
import {
  getCategories,
  addCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 *
 *   post:
 *     summary: Add new category (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       403:
 *         description: Access denied for non-admin users
 */

// Public
router.get("/", getCategories);

// Admin only
router.post("/", authMiddleware, addCategory);

export default router;
