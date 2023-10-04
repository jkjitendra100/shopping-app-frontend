import express from "express";
import {
	allFantasies,
	getSingleFantasy,
	newFantasy,
} from "../controllers/fantasy.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newFantasy);
router.get("/all", allFantasies);
router.get("/:id", getSingleFantasy);

export default router;
