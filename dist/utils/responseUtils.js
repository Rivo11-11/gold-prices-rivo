export default class ResponseUtils {
    static success(res, data) {
        const response = {
            success: true,
            data,
        };
        return res.status(200).json(response);
    }
    static error(res, statusCode = 500, error) {
        const response = {
            success: false,
            error: error,
        };
        return res.status(statusCode).json(response);
    }
    static unprocessableEntity(res, error) {
        return this.error(res, 422, error);
    }
    static badRequest(res, error) {
        return this.error(res, 400, error);
    }
    static unauthorized(res, error) {
        return this.error(res, 401, error);
    }
    static notFound(res, error) {
        return this.error(res, 404, error);
    }
    static tooManyRequest(res, error) {
        return this.error(res, 429, error);
    }
}
//# sourceMappingURL=responseUtils.js.map