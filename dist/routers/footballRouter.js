import { Router } from "express";
import { FootballController } from "../controllers/FootballController.js";
const router = Router();
const footballController = new FootballController();
router.get("/", footballController.getMatches.bind(footballController));
export default router;
//# sourceMappingURL=footballRouter.js.map