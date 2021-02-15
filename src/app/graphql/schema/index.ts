import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
// SCHEMAS
import typeDefsUser from './users.schema.graphql'

// RESOLVERS
import { userResolvers } from '../resolvers'

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsUser,
  resolvers: userResolvers
})

export {
  userSchema,
}