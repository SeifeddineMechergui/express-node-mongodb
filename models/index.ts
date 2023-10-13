
import { dbConfig } from "../config/db.config";
import mongoose, { Mongoose } from "mongoose";
import { Model } from "mongoose";
import { TutorialDocument, tutorialSchema } from "./tutorial.model"; 

mongoose.Promise = global.Promise;

interface Database {
  mongoose: typeof mongoose;
  url: string;
  tutorials: Model<TutorialDocument>;
}

const db: Database = {
  mongoose,
  url: dbConfig.url,
  tutorials: mongoose.model<TutorialDocument>("Tutorial", tutorialSchema),
};

export default db;
