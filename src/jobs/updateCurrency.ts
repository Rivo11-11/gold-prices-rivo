import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import Currency from "../models/currency.js";
import currencyKeys from "../models/currencyKeys.js";

export async function updateCurrency() {
    const keys = await currencyKeys.findOne();
    if (!keys) {
        throw new Error("No API keys document found in the database");
    }

    if (!keys.keys || keys.keys.length === 0) {
        throw new Error("No API keys available in the keys document");
    }

    try {
    const response = await axios.get(process.env.CURRENCY_API_URL!, {
        headers: {
            'Authorization': 'Token ' + keys.keys[keys.next]
        }
    });
    const data = response.data;

    // Rotate keys safely
    const keysLength = keys.keys.length;
    const newNext = (keys.next + 1) % keysLength;
    keys.last = keys.next;
    keys.next = newNext;
    await keys.save();

    const result = await Currency.findOneAndUpdate(
        { base: data.base },
        {
            timestamp: data.timestamp,
            rates: data.rates,
            nextExecution: new Date(Date.now() + 30 * 60 * 1000),
        },
        { upsert: true, new: true }
    );
    console.log("✅ Currency updated");
    return result;
    } catch (error) {
        if ((error as any).response.status === 403) {
            console.log("❌ API key limit reached for key number : ", keys.next);
            const newNext = (keys.next + 1) % keys.keys.length;
            keys.last = keys.next;
            keys.next = newNext;
            await keys.save();
            return updateCurrency();
        }
    }

}
