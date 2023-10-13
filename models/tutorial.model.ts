import { Document, Schema, model, Model } from 'mongoose';

const tutorialSchema = new Schema({
  title: String,
  description: String,
  published: Boolean,
});

export interface TutorialDocument extends Document {
  title: string;
  description: string;
  published: boolean;
}

export const Tutorial: Model<TutorialDocument> = model<TutorialDocument>('Tutorial', tutorialSchema);

export default Tutorial;

export { tutorialSchema };
