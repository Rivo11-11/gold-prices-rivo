import ResponseUtils from "../utils/responseUtils.js";
import Metal from "../models/metal.js";
export class MetalController {
    async getMetalPrice(req, res) {
        const data = await Metal.findOne({
            symbol: 'XAUEGP'
        });
        return ResponseUtils.success(res, data);
    }
}
//# sourceMappingURL=MetalController.js.map