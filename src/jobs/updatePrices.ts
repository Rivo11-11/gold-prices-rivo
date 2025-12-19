import dotenv from "dotenv";
dotenv.config();
// import { agenda } from "../utils/agenda.js";
import axios from "axios";
import Metal from "../models/metal.js";
import Keys from "../models/keys.js";

// agenda.define("update-gold-price", async () => {
//     console.log("⏳ Updating gold price...");
//     await updateGoldPrice();
// });

export async function updateGoldPrice() {
    const keys = await Keys.findOne();
    if (!keys) {
        throw new Error("No API keys document found in the database");
    }

    if (!keys.keys || keys.keys.length === 0) {
        throw new Error("No API keys available in the keys document");
    }

    try {
    const response = await axios.get(process.env.METAL_API_URL!, {
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

    const result = await Metal.findOneAndUpdate(
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
            nextExecution: new Date(Date.now() + 20 * 60 * 1000),
        },
        { upsert: true, new: true }
    );
    console.log("✅ Gold price updated");
    return result;
    } catch (error) {
        if ((error as any).response.status === 403) {
            console.log("❌ API key limit reached for key number : ", keys.current);
            const newCurrent = (keys.current + 1) % keys.keys.length;
            keys.current = newCurrent;
            await keys.save();
            return updateGoldPrice();
        }
    }

}
