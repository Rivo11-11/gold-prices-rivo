import ResponseUtils from "../utils/responseUtils.js";
export const isAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token === process.env.ADMIN_TOKEN) {
            next();
        }
        else {
            return ResponseUtils.unauthorized(res, 'Unauthorized');
        }
    }
    else {
        return ResponseUtils.unauthorized(res, 'Unauthorized');
    }
};
//# sourceMappingURL=isAuth.js.map