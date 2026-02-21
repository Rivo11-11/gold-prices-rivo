import { Router } from "express";
import { GoldController } from "../controllers/GoldController.js";
import { isAuth } from "../middleware/isAuth.js";
const router = Router();
const goldController = new GoldController();
router.get("/", isAuth, goldController.scrapeGoldPrices.bind(goldController));
export default router;
//# sourceMappingURL=goldRouter.js.map