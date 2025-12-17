import upload from '../config/multer.js';
export const uploadImageMiddleware = (fieldName) => {
    return [
        upload.single(fieldName),
        async (req, res, next) => {
            if (!req.file) {
                return next();
            }
            req.body[fieldName] = req.file;
            next();
        }
    ];
};
export const uploadMultipleMediaMiddleware = (fields) => {
    return [
        upload.fields(fields.map(field => ({ name: field.name, maxCount: field.maxCount || 1 }))),
        async (req, res, next) => {
            if (!req.files) {
                return next();
            }
            const files = req.files;
            for (const [fieldName, fileArray] of Object.entries(files)) {
                if (fileArray && fileArray.length > 0) {
                    if (fieldName === 'medias') {
                        req.body[fieldName] = fileArray;
                    }
                    else {
                        const file = fileArray[0];
                        req.body[fieldName] = file;
                    }
                }
            }
            next();
        }
    ];
};
export default upload;
//# sourceMappingURL=uploadMiddleware.js.map