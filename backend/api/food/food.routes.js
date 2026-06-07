import express from "express";
import { foodController } from "./food.controller.js";
import auth from '../../middleware/auth.js';
const router = express.Router();

// Public routes
router.get("/", foodController.getAll);

// Admin-protected routes
router.post("/add", auth, foodController.add);
router.delete("/remove/:id", auth, foodController.remove);
router.put("/update/:id", auth, foodController.update);

export default router;