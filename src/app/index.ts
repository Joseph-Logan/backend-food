import { Router } from 'express';

import auth from './routes/auth';
import graphQL from './routes/graphql';

export default () => {
  const app: Router = Router();

  auth(app);
  graphQL(app);

  return app
}