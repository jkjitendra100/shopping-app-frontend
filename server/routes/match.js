import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllMatches, getMatchById, newMatch } from "../controllers/match.js";

const router = express.Router();

router.post("/new", isAuthenticated, newMatch);
router.get("/all", getAllMatches);
router.get("/:id", getMatchById);

export default router;
