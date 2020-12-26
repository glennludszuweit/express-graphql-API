import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { register, login } from './mutations/UserMutation.js';
import { addPost, updatePost, deletePost } from './mutations/PostMutation.js';
import {
  addComment,
  updateComment,
  deleteComment,
} from './mutations/CommentMutation.js';
import { getUsers, getUser } from './queries/UserQuery.js';
import { getPosts, getPost } from './queries/PostQuery.js';
import { getComments, getComment } from './queries/CommentQuery.js';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getUsers, getUser, getPosts, getPost, getComments, getComment },
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    register,
    login,
    addPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
  },
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
