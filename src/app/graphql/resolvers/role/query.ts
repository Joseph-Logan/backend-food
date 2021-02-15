import { Role } from '../../../models'
import { IResolvers } from 'graphql-tools';

const query: IResolvers = {
  Query: {
    roles: async () => {
      return await Role.find()
    }
  }
}

export default query;