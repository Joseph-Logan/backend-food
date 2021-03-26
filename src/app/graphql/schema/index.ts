import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema, stitchSchemas } from 'graphql-tools';
// SCHEMAS
import typeDefsRole from './role.schema.graphql';
import typeDefsUser from './user.schema.graphql';
import typeDefsCategory from './category.schema.graphql';
// RESOLVERS
import { 
  roleResolvers, 
  userResolvers, 
  categoryResolvers 
} from '@app/graphql/resolvers';

const schemaRole: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsRole,
  resolvers: roleResolvers,
});

const schemaUser: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsUser,
  resolvers: userResolvers,
});

const schemaCategory: GraphQLSchema = makeExecutableSchema({
  typeDefs: typeDefsCategory,
  resolvers: categoryResolvers
})

const globalSchema = stitchSchemas({
  subschemas: [
    schemaUser, 
    schemaRole,
    schemaCategory
  ],
});

export { globalSchema };
