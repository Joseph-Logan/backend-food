import { Models } from '@app/models'
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const mutation: IResolvers = {
  Mutation: {
    storeRole: async (_: void, { role }) => {
      try {
        let roleInstance = new Models.Role(role)
        let roleSaved = await roleInstance.save()

        return roleSaved
      } catch (err) {
        Logger.error('Error in %o: ', err)
      }
    }
  }
}

export default mutation