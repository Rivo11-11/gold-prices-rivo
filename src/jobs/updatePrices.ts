import dotenv from "dotenv";
dotenv.config();
// import { agenda } from "../utils/agenda.js";
import axios from "axios";
import * as cheerio from "cheerio";
import Metal from "../models/metal.js";
import Gold from "../models/gold.js";
import Keys from "../models/keys.js";

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

interface GoldPrice {
    type: string;
    sell: number;
    buy: number;
}

export async function updateGoldFromScrape() {
    const { data } = await axios.get(process.env.GOLD_API_URL!, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept": "text/html,application/xhtml+xml",

        },
        decompress: true
    });

    const $ = cheerio.load(data, {
        xmlMode: false,
    });
    const prices: GoldPrice[] = [];
    const goldTable = $("table.table").filter((_, el) => {
        return $(el).find('tbody a[href*="/gold/"]').length > 0;
    });

    const parsePrice = (raw: string): number =>
        parseInt(raw.replace(/[^\d]/g, ""), 10);

    goldTable.find("tbody tr").each((_, row: any) => {
        const cells = $(row).find("td");
        const type = cells.eq(0).text().trim();
        const sell = parsePrice(cells.eq(1).text().trim());
        const buy = parsePrice(cells.eq(2).text().trim());

        if (type) {
            prices.push({ type, sell, buy });
        }
    });
    const result = await Gold.findOneAndUpdate(
        {},
        {
            prices: prices,
            nextExecution: new Date(Date.now() + 60 * 60 * 1000),
        },
        { upsert: true, new: true }
    );
    console.log("✅ Gold price updated");
    return result;


}