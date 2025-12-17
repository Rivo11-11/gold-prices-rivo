import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/errorUtils.js';
export declare const globalErrorHandler: (error: CustomError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=errorHandler.d.ts.map