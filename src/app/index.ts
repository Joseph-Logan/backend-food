import { Router } from 'express';

import auth from '@app/routes/auth';
import graphQL from '@app/routes/graphql';

export default () => {
  const app: Router = Router();

  auth(app);
  graphQL(app);

  return app
}