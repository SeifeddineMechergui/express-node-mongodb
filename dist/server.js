"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const tutorial_routes_1 = __importDefault(require("./routes/tutorial.routes"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:8081',
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
models_1.default.mongoose
    .connect(models_1.default.url, {})
    .then(() => {
    console.log('Connected to the database!');
})
    .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit(1);
});
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Seifeddine application.' });
});
(0, tutorial_routes_1.default)(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
