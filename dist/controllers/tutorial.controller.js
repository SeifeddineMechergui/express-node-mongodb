"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublished = exports.deleteAll = exports.deleteTutorial = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const tutorial_model_1 = __importDefault(require("../models/tutorial.model"));
const create = (req, res) => {
    const { title, description, published } = req.body;
    if (!title) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    const tutorial = new tutorial_model_1.default({
        title,
        description,
        published: published || false,
    });
    tutorial
        .save()
        .then((savedTutorial) => {
        res.send(savedTutorial);
    })
        .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Tutorial.",
        });
    });
};
exports.create = create;
const findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { $regex: new RegExp(title, 'i') } } : {};
    tutorial_model_1.default.find(condition)
        .then((tutorials) => {
        res.send(tutorials);
    })
        .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving tutorials.",
        });
    });
};
exports.findAll = findAll;
const findOne = (req, res) => {
    const id = req.params.id;
    tutorial_model_1.default.findById(id)
        .then((tutorial) => {
        if (!tutorial) {
            res.status(404).send({ message: `Not found Tutorial with id ${id}` });
        }
        else {
            res.send(tutorial);
        }
    })
        .catch((error) => {
        res.status(500).send({ message: `Error retrieving Tutorial with id=${id}` });
    });
};
exports.findOne = findOne;
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!",
        });
    }
    const id = req.params.id;
    tutorial_model_1.default.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then((updatedTutorial) => {
        if (!updatedTutorial) {
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
        }
        else {
            res.send({ message: "Tutorial was updated successfully.", data: updatedTutorial });
        }
    })
        .catch((error) => {
        res.status(500).send({ message: `Error updating Tutorial with id=${id}` });
    });
};
exports.update = update;
const deleteTutorial = (req, res) => {
    const id = req.params.id;
    tutorial_model_1.default.findByIdAndDelete(id)
        .then((deletedTutorial) => {
        if (!deletedTutorial) {
            res.status(404).send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
        }
        else {
            res.send({ message: "Tutorial was deleted successfully." });
        }
    })
        .catch((error) => {
        res.status(500).send({ message: `Could not delete Tutorial with id=${id}` });
    });
};
exports.deleteTutorial = deleteTutorial;
const deleteAll = (req, res) => {
    tutorial_model_1.default.deleteMany({})
        .then(({ deletedCount }) => {
        res.send({ message: `${deletedCount} Tutorials were deleted successfully!` });
    })
        .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error occurred while removing all tutorials.",
        });
    });
};
exports.deleteAll = deleteAll;
const findAllPublished = (req, res) => {
    tutorial_model_1.default.find({ published: true })
        .then((publishedTutorials) => {
        res.send(publishedTutorials);
    })
        .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving tutorials.",
        });
    });
};
exports.findAllPublished = findAllPublished;
