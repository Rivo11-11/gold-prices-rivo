import { Router } from "express";
import { MetalController } from "../controllers/MetalController.js";
const router = Router();
const metalController = new MetalController();
router.get("/", metalController.getMetalPrice.bind(metalController));
export default router;
//# sourceMappingURL=metalRouter.js.map