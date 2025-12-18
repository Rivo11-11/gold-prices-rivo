import { Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils.js";
import Metal from "../models/metal.js";
import { updateGoldPrice } from "../jobs/updatePrices.js";

export class MetalController  {
  async getMetalPrice(req: Request, res: Response) {
    const data = await Metal.findOne({
      symbol: 'GOLDAPI:XAUEGP'
    })
    if (!data?.nextExecution || data.nextExecution < new Date()) {
      const result = await updateGoldPrice();
      return ResponseUtils.success(res, result);
    }
    console.log("✅ Gold price is up to date");
    return ResponseUtils.success(res, data);
  }

}