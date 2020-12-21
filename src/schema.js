import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { register, login } from './mutations/UserMutation.js';
import { getUsers, getUser } from './queries/UserQuery.js';
import { addPost } from './mutations/PostMutation.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getUsers, getUser },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    register,
    login,
    addPost,
  },
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
