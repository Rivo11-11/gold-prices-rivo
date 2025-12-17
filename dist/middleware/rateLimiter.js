import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
const verificationRateLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour
    max: 3,
    message: {
        message: 'Too many verification code requests from this device. Please try again later.',
    },
    keyGenerator: (req) => {
        return req.header('X-Device-ID') || ipKeyGenerator(req);
    },
    standardHeaders: true,
    legacyHeaders: false,
});
export default verificationRateLimiter;
//# sourceMappingURL=rateLimiter.js.map