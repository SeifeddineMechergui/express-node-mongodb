"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const mongoose_1 = __importDefault(require("mongoose"));
const tutorial_model_1 = require("./tutorial.model");
mongoose_1.default.Promise = global.Promise;
const db = {
    mongoose: mongoose_1.default,
    url: db_config_1.dbConfig.url,
    tutorials: mongoose_1.default.model("Tutorial", tutorial_model_1.tutorialSchema),
};
exports.default = db;
