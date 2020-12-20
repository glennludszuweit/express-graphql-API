import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import User from '../models/UserModel.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.authorId);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
    },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment Type',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    post: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.authorId);
      },
    },
    post: {
      type: PostType,
      async resolve(parent, args) {
        return await Post.findById(parent.postId);
      },
    },
  }),
});
