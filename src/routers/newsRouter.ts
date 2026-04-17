import { Router } from "express";
import { NewsController } from "../controllers/NewsController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();
const newsController = new NewsController();

router.get("/", isAuth, newsController.getNews.bind(newsController));

export default router;
