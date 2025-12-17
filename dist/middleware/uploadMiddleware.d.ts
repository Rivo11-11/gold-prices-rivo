import upload from '../config/multer.js';
export declare const uploadImageMiddleware: (fieldName: string) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
export declare const uploadMultipleMediaMiddleware: (fields: {
    name: string;
    maxCount?: number;
}[]) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>[];
export default upload;
//# sourceMappingURL=uploadMiddleware.d.ts.map