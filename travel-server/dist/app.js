"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const keys_1 = require("./config/keys");
const cors_1 = __importDefault(require("cors"));
const tour_1 = __importDefault(require("./routes/tour"));
const user_1 = __importDefault(require("./routes/user"));
const review_1 = __importDefault(require("./routes/review"));
const review_2 = __importDefault(require("./routes/review"));
const app = express_1.default();
exports.app = app;
mongoose_1.default.connect(keys_1.keys.mongoURI, { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api/tour', tour_1.default);
app.use('/api/user', user_1.default);
app.use('/api/review', review_1.default);
app.use('/api/order', review_2.default);
//# sourceMappingURL=app.js.map