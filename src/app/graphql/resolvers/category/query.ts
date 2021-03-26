import { Models } from '@app/models'
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const query: IResolvers = {
  Query: {
    categories: async () => {
      try {
        return await Models.Category.find()
      } catch (err) {
        Logger.error('Error in %o: ', err)
      }
    }
  }
}

export default query;