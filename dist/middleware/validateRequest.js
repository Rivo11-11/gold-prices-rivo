import { validationResult } from 'express-validator';
import ResponseUtils from '../utils/responseUtils.js';
export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ResponseUtils.unprocessableEntity(res, errors.array().map(err => err.msg));
    }
    next();
};
//# sourceMappingURL=validateRequest.js.map