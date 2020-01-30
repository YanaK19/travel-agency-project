"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    });
};
//# sourceMappingURL=errorHandler.js.map