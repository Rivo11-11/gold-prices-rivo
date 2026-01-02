import { Router } from "express";
import { CurrencyController } from "../controllers/CurrencyController.js";
import { isAuth } from "../middleware/isAuth.js";
const router = Router();
const currencyController = new CurrencyController();
router.get("/", isAuth, currencyController.getCurrencyPrice.bind(currencyController));
export default router;
//# sourceMappingURL=currencyRouter.js.map