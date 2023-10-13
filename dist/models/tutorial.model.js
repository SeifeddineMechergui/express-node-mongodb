"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialSchema = exports.Tutorial = void 0;
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    published: Boolean,
});
exports.tutorialSchema = tutorialSchema;
exports.Tutorial = (0, mongoose_1.model)('Tutorial', tutorialSchema);
exports.default = exports.Tutorial;
