import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import Metal from "../models/metal.js";
import ResponseUtils from "../utils/responseUtils.js";
import axios from "axios";
import Keys from "../models/keys.js";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    try {
        const { CRON_SECRET, MONGODB_URI, METAL_API_URL } = process.env;
        if (!CRON_SECRET) throw new Error("CRON_SECRET is not defined");
        if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
        if (!METAL_API_URL) throw new Error("METAL_API_URL is not defined");

        if (req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
            return ResponseUtils.unauthorized(res, "Not authorized");
        }

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI);
        }

        const keys = await Keys.findOne();
        if (!keys) {
            throw new Error("No API keys document found in the database");
        }

        if (!keys.keys || keys.keys.length === 0) {
            throw new Error("No API keys available in the keys document");
        }

        const response = await axios.get(METAL_API_URL, {
            headers: {
                'x-access-token': keys.keys[keys.current]
            }
        });
        const data = response.data;

        // Rotate keys safely
        const keysLength = keys.keys.length;
        const newCurrent = (keys.current + 1) % keysLength;
        keys.current = newCurrent;
        await keys.save();

        await Metal.findOneAndUpdate(
            { symbol: data.symbol },
            {
                timestamp: data.timestamp,
                metal: data.metal,
                currency: data.currency,
                exchange: data.exchange,
                symbol: data.symbol,
                open_time: data.open_time,
                price: data.price,
                ch: data.ch,
                ask: data.ask,
                bid: data.bid,
                price_gram_24k: data.price_gram_24k,
                price_gram_22k: data.price_gram_22k,
                price_gram_21k: data.price_gram_21k,
                price_gram_20k: data.price_gram_20k,
                price_gram_18k: data.price_gram_18k,
                price_gram_16k: data.price_gram_16k,
                price_gram_14k: data.price_gram_14k,
                price_gram_10k: data.price_gram_10k,
            },
            { upsert: true, new: true }
        );
        return ResponseUtils.success(res, 'Metal prices updated successfully');
    } catch (error: any) {
        console.error("Error updating metal prices:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return ResponseUtils.unprocessableEntity(res, "Failed to update metal prices: " + errorMessage);
    }
}
