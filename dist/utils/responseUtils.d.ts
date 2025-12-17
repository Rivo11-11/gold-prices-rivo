import { Response } from 'express';
export default class ResponseUtils {
    static success<T>(res: Response, data?: T): Response;
    static error(res: Response, statusCode?: number, error?: any): Response;
    static unprocessableEntity(res: Response, error?: any): Response;
    static badRequest(res: Response, error?: any): Response;
    static unauthorized(res: Response, error?: any): Response;
    static notFound(res: Response, error?: any): Response;
    static tooManyRequest(res: Response, error?: any): Response;
}
//# sourceMappingURL=responseUtils.d.ts.map