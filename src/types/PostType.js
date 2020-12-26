import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import UserType from './UserType.js';
import CommentType from './CommentType.js';

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findById(parent.authorId);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      async resolve(parent, args) {
        return await Comment.find({ postId: parent.id });
      },
    },
  }),
});

export default PostType;
