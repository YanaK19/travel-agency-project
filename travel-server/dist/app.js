"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
exports.app = app;
app.get('/echo', (req, res) => {
    console.log(req.method, req.path, ` param:${req.query.message}`);
});
app.get('*', (req, res) => {
    res.json({ message: `page not found` });
});
//# sourceMappingURL=app.js.map