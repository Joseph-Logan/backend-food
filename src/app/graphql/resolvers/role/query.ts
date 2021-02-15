import { Role } from '../../../models'
import { IResolvers } from 'graphql-tools';
import Logger from '../../../../loaders/logger';

const query: IResolvers = {
  Query: {
    roles: async () => {
      try {
        return await Role.find()
      } catch (err) {
        Logger.error('Error in %o: ', err)
      }
    }
  }
}

export default query;