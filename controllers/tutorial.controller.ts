import { Request, Response } from 'express';
import Tutorial, { TutorialDocument } from '../models/tutorial.model';

export const create = (req: Request, res: Response)=> {
  const { title, description, published } = req.body;

  if (!title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const tutorial = new Tutorial({
    title,
    description,
    published: published || false,
  });

  tutorial
    .save()
    .then((savedTutorial: TutorialDocument) => {
      res.send(savedTutorial);
    })
    .catch((error: Error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

export const findAll = (req: Request, res: Response): void => {
  const title = req.query.title as string;
  const condition: any = title ? { title: { $regex: new RegExp(title, 'i') } } : {};

  Tutorial.find(condition)
    .then((tutorials: TutorialDocument[]) => {
      res.send(tutorials);
    })
    .catch((error: Error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

export const findOne = (req: Request, res: Response): void => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((tutorial: TutorialDocument | null) => {
      if (!tutorial) {
        res.status(404).send({ message: `Not found Tutorial with id ${id}` });
      } else {
        res.send(tutorial);
      }
    })
    .catch((error: Error) => {
      res.status(500).send({ message: `Error retrieving Tutorial with id=${id}` });
    });
};

export const update = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((updatedTutorial: TutorialDocument | null) => {
      if (!updatedTutorial) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({ message: "Tutorial was updated successfully.", data: updatedTutorial });
      }
    })
    .catch((error: Error) => {
      res.status(500).send({ message: `Error updating Tutorial with id=${id}` });
    });
};

export const deleteTutorial = (req: Request, res: Response)=> {
  const id = req.params.id;

  Tutorial.findByIdAndDelete(id)
    .then((deletedTutorial: TutorialDocument | null) => {
      if (!deletedTutorial) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({ message: "Tutorial was deleted successfully." });
      }
    })
    .catch((error: Error) => {
      res.status(500).send({ message: `Could not delete Tutorial with id=${id}` });
    });
};

export const deleteAll = (req: Request, res: Response)=> {
  Tutorial.deleteMany({})
    .then(({ deletedCount }: { deletedCount: number }) => {
      res.send({ message: `${deletedCount} Tutorials were deleted successfully!` });
    })
    .catch((error: Error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while removing all tutorials.",
      });
    });
};

export const findAllPublished = (req: Request, res: Response) => {
  Tutorial.find({ published: true })
    .then((publishedTutorials: TutorialDocument[]) => {
      res.send(publishedTutorials);
    })
    .catch((error: Error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
