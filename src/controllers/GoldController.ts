import { Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils.js";
import Gold from "../models/gold.js";
import { updateGoldFromScrape } from "../jobs/updatePrices.js";

export class GoldController {


    async scrapeGoldPrices(req: Request, res: Response) {

        const data = await Gold.findOne({})
        if (!data?.nextExecution || data.nextExecution < new Date()) {
            const result = await updateGoldFromScrape();
            return ResponseUtils.success(res, result);
        }
        console.log("✅ Gold price is up to date");
        return ResponseUtils.success(res, data);
    }


}