import express from "express";
import {
	allFantasies,
	getMyFantasies,
	getSingleFantasy,
	newFantasy,
	processPayment,
	updateFantasy,
} from "../controllers/fantasy.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newFantasy);
router.post("/payment", isAuthenticated, processPayment);
router.get("/all", allFantasies);
router.get("/:id", getSingleFantasy);
router.get("/my/:userId", isAuthenticated, getMyFantasies);
router.patch("/:id", isAuthenticated, updateFantasy);

export default router;
