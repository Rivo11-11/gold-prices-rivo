import { Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils.js";
import { updateCurrency } from "../jobs/updateCurrency.js";
import Currency from "../models/currency.js";

export class CurrencyController  {
  async getCurrencyPrice(req: Request, res: Response) {
    const data = await Currency.findOne({
      base: 'USD'
    })
    if (!data?.nextExecution || data.nextExecution < new Date()) {
      const result = await updateCurrency();
      return ResponseUtils.success(res, result);
    }
    console.log("✅ Currency price is up to date");
    return ResponseUtils.success(res, data);
  }

}