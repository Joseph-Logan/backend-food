import { IResolvers } from 'graphql-tools';

const query: IResolvers = {
  Query: {
    users(): any {
      return {
        name: 'Joseph Ramirez Marchena'
      }
    }
  }
}

export default query;