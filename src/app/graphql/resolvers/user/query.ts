import { Models } from '@app/models'
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const query: IResolvers = {
  Query: {
    users: async () => {
      try {
        return await Models.User.find().populate('role')
      } catch (err) {
        Logger.error('Error in %o: ', err)
      }
    },

  }
}

export default query;