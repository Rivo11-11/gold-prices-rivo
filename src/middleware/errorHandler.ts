import { Request, Response, NextFunction } from 'express';
import ResponseUtils from '../utils/responseUtils.js';
import CustomError from '../utils/errorUtils.js';
export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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