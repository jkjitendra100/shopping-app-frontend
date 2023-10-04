import express from "express";
import { phoneAuth } from "../controllers/phoneAuth.js";

const router = express.Router();

router.post("/phoneLogin", phoneAuth);

export default router;
 