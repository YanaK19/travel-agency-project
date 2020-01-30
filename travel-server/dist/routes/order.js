"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const orderRoutes = express_1.default.Router();
orderRoutes.post('/', order_1.create);
orderRoutes.get('/', order_1.getOrders);
orderRoutes.delete('/:id', order_1.remove);
exports.default = orderRoutes;
//# sourceMappingURL=order.js.map