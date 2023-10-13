import { Application } from 'express';
import * as tutorials from '../controllers/tutorial.controller';

import { Router } from 'express';

export default (app: Application): void => {
  const router: Router = Router();

  router.post('/', tutorials.create);

  router.get('/', tutorials.findAll);

  router.get('/published', tutorials.findAllPublished);

  router.get('/:id', tutorials.findOne);

  router.put('/:id', tutorials.update);

  router.delete('/:id', tutorials.deleteTutorial);

  router.delete('/', tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
