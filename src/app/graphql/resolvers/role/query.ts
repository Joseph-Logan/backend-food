import { Models } from '@app/models'
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const query: IResolvers = {
  Query: {
    roles: async () => {
      try {
        return await Models.Role.find()
      } catch (err) {
        Logger.error('Error in %o: ', err)
        throw err
      }
    },
    role: async (_: void, {_id}) => {
      try {
        return await Models.Role.findById(_id)
      } catch (err) {
        Logger.error('Error in %o: ', err)
        throw err
      }
    }
  }
}

export default query;