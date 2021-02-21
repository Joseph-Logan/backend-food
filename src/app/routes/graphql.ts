import { Router } from 'express';
import { validateActiveAuth } from '../../services/handle-token'
// import middlewares from '../middlewares';
import { graphqlHTTP } from 'express-graphql';

/** SCHEMA AND RESOLVERS */
import { globalSchema } from '../graphql/schema'

const route: Router = Router();
export default (app: Router) => {
  app.use('/graphql', route)

  // set routes and set middlewares, required user logged
  
  route.use(
    validateActiveAuth,
    graphqlHTTP({
      schema: globalSchema,
      graphiql: true,
    })
  )
}