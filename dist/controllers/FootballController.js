import ResponseUtils from "../utils/responseUtils.js";
import axios from "axios";
export class FootballController {
    async getMatches(req, res) {
        const response = await axios.get('https://www.sofascore.com/api/v1/sport/football/scheduled-events/2026-01-10');
        console.log(response.data);
        return ResponseUtils.success(res, response.data);
    }
    async getChampionship(req, res) {
        const response = await axios.get('https://www.sofascore.com/api/v1/sport/football/scheduled-events/2026-01-10');
        console.log(response.data);
        return ResponseUtils.success(res, response.data);
    }
}
//# sourceMappingURL=FootballController.js.map