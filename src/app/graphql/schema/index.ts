import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema, stitchSchemas } from 'graphql-tools';
// SCHEMAS
import typeDefsRole from './role.schema.graphql';
import typeDefsUser from './user.schema.graphql';
// RESOLVERS
import { roleResolvers, userResolvers } from '../resolvers';

const schemaRole: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsRole,
  resolvers: roleResolvers,
});

const schemaUser: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsUser,
  resolvers: userResolvers,
});

const globalSchema = stitchSchemas({
  subschemas: [schemaUser, schemaRole],
});

export { globalSchema };
