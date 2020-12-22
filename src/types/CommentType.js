import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import User from '../models/User.js';
import Post from '../models/Post.js';
import UserType from './UserType.js';
import PostType from './PostType.js';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment Type',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
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

export default CommentType;
