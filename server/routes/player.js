import express from "express";
import { addPlayer, getAllPlayers } from "../controllers/player.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, addPlayer); 
router.get("/all", isAuthenticated, getAllPlayers); 

export default router;
 