import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
	getAllContests,
	getSingleContest,
	newContest,
} from "../controllers/contest.js";

const router = express.Router();

router.post("/new", isAuthenticated, newContest);
router.get("/all", getAllContests);
router.get("/:id", getSingleContest);

export default router;
