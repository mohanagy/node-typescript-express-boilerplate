import express from "express";
import systemRoutes from "./system";
const router = express.Router();

router.use("/api/v1/", [systemRoutes]);
export default router;
