import { Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils.js";
import Metal from "../models/metal.js";

export class MetalController  {
  async getMetalPrice(req: Request, res: Response) {
    const data = await Metal.findOne({
      symbol: 'XAUEGP'
    })
    return ResponseUtils.success(res, data);
  }

}