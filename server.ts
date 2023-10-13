import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import db from './models';
import tutorialRoutes from './routes/tutorial.routes';

const app: Application = express();

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err: any) => {
    console.log('Cannot connect to the database!', err);
    process.exit(1);
  });

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Seifeddine application.' });
});

tutorialRoutes(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
