import { Models } from '@app/models'
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const mutation: IResolvers = {
  Mutation: {
    storeCategory: async (_: void, {category}) => {
      try {
        let categoryInstance = new Models.Category(category);
        return await categoryInstance.save()
      } catch (err) {
        Logger.error('Error in %o: ', err)
        throw err
      }
    }
  }
}

export default mutation