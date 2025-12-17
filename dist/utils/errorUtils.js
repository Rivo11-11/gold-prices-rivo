class CustomError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}
export default CustomError;
//# sourceMappingURL=errorUtils.js.map