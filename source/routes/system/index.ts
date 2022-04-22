import express from "express";
import { systemControllers } from "@controllers";

const router = express.Router();
router.get("/ping", systemControllers.health.checkHealth);
router.use("/system",router);

export default router;
