import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { register, login } from './mutations/UserMutation.js';
import { users } from './queries/UserQuery.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { users },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    register,
    login,
  },
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
