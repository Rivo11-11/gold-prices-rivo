import ResponseUtils from '../utils/responseUtils.js';
export const globalErrorHandler = (error, req, res, next) => {
    switch (error.name) {
        case "MulterError":
            return ResponseUtils.unprocessableEntity(res, error.message);
        case "JsonWebTokenError":
            return ResponseUtils.unauthorized(res, "Jwt token is malformed");
        case "TokenExpiredError":
            return ResponseUtils.unauthorized(res, "Jwt token is expired");
        default:
            return ResponseUtils.error(res, 400, error.message);
    }
};
//# sourceMappingURL=errorHandler.js.map