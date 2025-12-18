import { Router } from "express";
import { MetalController } from "../controllers/MetalController.js";
import { isAuth } from "../middleware/isAuth.js";
const router = Router();
const metalController = new MetalController();

router.get("/", isAuth , metalController.getMetalPrice.bind(metalController));


export default router; 