import express from "express";
import {
	addPlayer,
	getAllPlayers,
	getSinglePlayer,
} from "../controllers/player.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, addPlayer);
router.get("/all", isAuthenticated, getAllPlayers);
router.get("/:id", getSinglePlayer);

export default router;
