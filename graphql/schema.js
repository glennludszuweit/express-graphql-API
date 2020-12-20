import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import {} from './mutations.js';
import {} from './queries.js';
import {} from './types.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {},
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {},
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
