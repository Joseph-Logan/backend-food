import { Models } from '@app/models';
import { IResolvers } from 'graphql-tools';
import Logger from '@loaders/logger';

const mutation: IResolvers = {
  Mutation: {
    storeRole: async (_: void, { role }) => {
      try {
        let roleInstance = new Models.Role(role);
        return await roleInstance.save();
      } catch (err) {
        Logger.error('Error in %o: ', err);
        throw err;
      }
    },
    updateRole: async (_: void, {_id, role}) => {
      try {
        return await Models.Role.findByIdAndUpdate(_id, role, {
          new: true
        })
      } catch (err) {
        Logger.error('Error in %o: ', err);
        throw err
      }
    },
    deleteRole: async (_: void, {_id}) => {
      try {
        return await Models.Role.findByIdAndDelete(_id)
      } catch (err) {
        Logger.error('Error in %o: ', err);
        throw err
      }
    }
  },
};

export default mutation;
